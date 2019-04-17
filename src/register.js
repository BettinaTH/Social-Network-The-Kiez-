import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        axios.post('/register', {
            first: this.first,
            last: this.last,
            email: this.email,
            password: this.password
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        })
    }
    render() {
        return (
            <div className="registration">
                    {this.state.error && <div className="error">Oops!</div>}
                <input name="first"  placeholder="first" onChange={this.handleChange} />
                <input name="last" placeholder="last" onChange={this.handleChange}/>
                <input name="email" placeholder="e-mail"onChange={this.handleChange}/>
                <input name="password" type="password" placeholder="*****"onChange={this.handleChange}/>
                <button onClick={this.submit}>Submit</button>
                <p>Already a profile? <Link to="/login">Click here to Log in!</Link></p>
            </div>
        )
    }
}