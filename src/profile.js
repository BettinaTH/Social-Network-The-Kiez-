import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';


export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        };



        render (){
            return(
                <div>
                    <p>Here is your profile.</p>
                    {this.props.first}
                    {this.props.last}  
                 <ProfilePic
                    picture = {this.props.picture}
                    showUploader = {this.props.showUploader}
                    />
                 <BioEditor
                    bio={this.props.bio}
                    showEditor = {this.props.showEditor}
                    setBio ={this.props.setBio}
                    editorIsVisible={this.props.editorIsVisible}
                    />
                </div>
            )
        };
    }