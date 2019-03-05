// REGISTER COMPONENT
import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    submit() {
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
            <div className='registration'>
                {this.state.error && <div className="error">Oops!</div>}
                <input name="first"  placeholder="first" onChange={e => this.handleChange(e)} />
                <input name="last" placeholder="first"/>
                <input name="email" placeholder="first"/>
                <input name="pass" placeholder="first"/>
                <button>Submit</button>
            </div>
        )
    }
}