import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {
    constructor() {
        super();
        this.state = {
            date: "",
            title: "",
            amount: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    valid() {
        return this.state.date && this.state.title && this.state.amount
    }
    handleChange(event) {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    handleSubmit(event) {
        event.preventDefault()
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        };
        RecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState = ({
                    date: "",
                    title: "",
                    amount: "",
                })
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="Date" name="date" />
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="Title" name="title" />
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="Amount" name="amount" />
                </div>
                <div className="form-group">
                    <button type="submit" onChange={this.handleChange} className="btn btn-primary" disabled={!this.valid()}>提交</button>
                </div>
            </form>
        )
    }
}