import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    submit(e) {
        axios.post('/login', {
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
            <div className='registration'>
                {this.state.error && <div className="error">Oops!</div>}
                <input name="email" placeholder="e-mail"onChange={this.handleChange}/>
                <input type= "password" name="password" placeholder="*****"onChange={this.handleChange}/>
                <button onClick={this.submit}>Submit</button>
                <p>New at THE KIEZ? <Link to="/">Click here to register!</Link></p>
            </div>
        )
    }
}