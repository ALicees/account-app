import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class Record extends Component {
    constructor() {
        super()
        this.state = {
            edit: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleToggle() {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleEdit(event) {
        event.preventDefault();
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }
        RecordsAPI.update(this.props.record.id, record).then(
            response => {
                this.setState({ edit: false })
                this.props.handleEditRecord(this.props.record, response.data)
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    handleDelete(event) {
        event.preventDefault();
        RecordsAPI.del(this.props.record.id).then(
            response => {
                this.props.handleDeleteRecord(this.props.record)
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    recordForm() {
        return (
            <tr>{/* 每一列对应唯一的一个ID*/}
                <td><input type="text" ref="date" className="form-control" defaultValue={this.props.record.date} /></td>
                <td><input type="text" ref="title" className="form-control" defaultValue={this.props.record.title} /></td>
                <td><input type="text" ref="amount" className="form-control" defaultValue={this.props.record.amount} /></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit}>更新</button>
                    <button className="btn btn-danger" onClick={this.handleToggle}>取消</button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.edit) {
            return this.recordForm();
        } else {
            return this.recordRow();
        }
    }
    recordRow() {
        return (
            <tr>{/* 每一列对应唯一的一个ID*/}
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle}>编辑</button>
                    <button className="btn btn-danger" onClick={this.handleDelete} >删除</button>
                </td>
            </tr>
        );
    }
}
Record.propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
}