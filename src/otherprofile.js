import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';
import Profile from './profile';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/others/' + this.props.match.params.id).then(data => {
            console.log('params ID in otherprofile Mount: ', this.props.match.params.id)
            console.log('data from other: ', data)
            if (data.data.id) {
                this.setState(data.data);
            // } else {
            //     this.props.history.push('/');
            }
        // }).catch(function(err){
        //     this.props.history.push('/');
        });
    }
    render() {
        return (
            <div>
                <Profile
                    first = {this.state.first}
                    picture = {this.state.picture}
                    bio = {this.state.bio}
                />
            </div>
        );
    }
}