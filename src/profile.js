import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';
import Uploader from './uploader';


export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        };


        render (){
            return(
            <div className='container-main'>
                <div>
                 <ProfilePic
                    picture = {this.props.picture}
                    onClick={this.props.onClick}
                    />
                 {this.props.uploaderIsVisible && <Uploader setPicture={props.setPicture} />}
                </div>

                    <div className='container-col'>
                    <h4>Hi {this.props.first}, great your back.</h4>
                        <BioEditor
                            bio={this.props.bio}
                            setBio ={this.props.setBio}
                            editorIsVisible={this.props.editorIsVisible}
                            />
                    </div>
            </div>
                    )
        };
    }