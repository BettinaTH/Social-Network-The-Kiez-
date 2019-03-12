import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/users/' + this.props.match.params.id).then(({data}) => {
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
                <ProfilePic
                    picture = {this.state.picture}
                />
                <BioEditor
                    bio = {this.state.bio}
                />
            </div>
        );
    }
}