import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import Amount from './Amount';
import * as RecordsAPI from '../utils/RecordsAPI';


class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            error: null,
            isLoader: false,
        }
    }
    //页面初始化之后开始加载这个方法
    componentDidMount() {
        RecordsAPI.getAll().then(
            response => this.setState({
                records: response.data,
                isLoader: true,
            })
        ).catch(error => this.setState({
            isLoader: true,
            error
        })
        )
    }
    addRecord(record) {
        this.setState({
            error: null,
            isLoader: false,
            records: [
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item, index) => {
            if (index !== recordIndex) {
                return item;
            }
            return {
                ...item,
                ...data,
            }
        })
        this.setState({
            records: newRecords,
        })
    }
    delete(record) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
        this.setState({
            records: newRecords,
        })
    }
    credits() {
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0
        })
        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0);
        }, 0)
    }
    debits() {
        let credits = this.state.records.filter((record) => {
            return record.amount < 0
        })
        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0);
        }, 0)
    }
    balace() {
        return this.credits() + this.debits();
    }
    render() {
        const { records, error, isLoader } = this.state;
        let defaultComponents;
        if (error) {
            defaultComponents = <div>Error:{error.message}</div>
        } else if (!isLoader) {
            defaultComponents = <div>...isLoading</div>
        } else {
            defaultComponents = <div>
                <table className="table table-bordered">
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {records.map((record) =>
                            (<Record
                                key={record.id}
                                record={record}
                                handleEditRecord={this.updateRecord.bind(this)}
                                handleDeleteRecord={this.delete.bind(this)}
                            />)
                        )}
                    </tbody>
                </table>
            </div>
        }
        return (
            <div>
                <h2></h2>
                <div className="row mb-3">
                    <Amount text="Credit" type="success" amount={this.credits()} />
                    <Amount text="Debit" type="danger" amount={this.debits()} />
                    <Amount text="Balance" type="info" amount={this.balace()} />
                </div>
                <RecordForm handleNewRecord={this.addRecord.bind(this)} />
                {defaultComponents}
            </div>
        )
    }
}

export default Records;