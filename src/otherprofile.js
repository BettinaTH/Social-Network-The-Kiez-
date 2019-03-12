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
        axios.get('/others/' + this.props.match.params.id).then(({data}) => {
            console.log('params ID in otherprofile Mount: ', this.props.match.id)
            if (data.id) {
                this.setState(data);
            } else {
                this.props.history.push('/');
            }
        }).catch(function(err){
            this.props.history.push('/');
        });
    }
    render() {
        return (
            <div>
                <Profile
                    picture = {this.state.picture}
                    bio = {this.state.bio}
                />
            </div>
        );
    }
}