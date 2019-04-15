import React from 'react';
import axios from './axios';
import Profile from './profile';
import FriendButton from './friendbutton';

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
                <div className="other-profile">
                    <div className="profile-heading">This is the profile of {this.state.first}</div>
                    <FriendButton
                        otherUserId={this.props.match.params.id}
                        myId={this.props.myId}
                        />
                </div>
                <Profile
                    picture = {this.state.picture}
                    bio = {this.state.bio}
                    />
            </div>
        );
    }
}