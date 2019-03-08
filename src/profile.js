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
                    <p>Hier ist dein Profil</p>
                    {this.props.first}
                    {this.props.last}  
                 <ProfilePic
                    picture = {this.props.picture}
                    showUploader = {this.props.showUploader}/>
                 <BioEditor
                    bio={this.props.bio}
                    show = {this.props.showEditor}
                    setBio ={this.props.setBio}
                    />
                </div>
            )
        };
    }