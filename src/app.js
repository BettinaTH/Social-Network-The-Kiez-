import React from 'react';
import axios from './axios';
import Uploader from './uploader';
//import Navbar from 'navbar';
import Profile from './profile';
import ProfilePic from './profilepic';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uploaderIsVisible: false
        }
        this.showUploader = this.showUploader.bind(this);
        this.setPicture = this.setPicture.bind(this);

    }

    showUploader(){
        this.setState({
            uploaderIsVisible: true
        })
    }

    setPicture(picture){
        this.setState({picture, uploaderIsVisible: false})
    }
    

    
componentDidMount(){
    axios.get('/user').then(({data}) =>{
        console.log('data in in app DidMount: ', data)
        if (data.id){
            this.setState(data)
            console.log('data.profile:', data)
        }else{
            console.log('err in app DidMount:' , data.success)
        }
    })
}
    render (){
            if(!this.state.id){
                console.log('this.state.id: ', this.state.id)
            return null;
        }
        return(
            <div className="container">
                <img src="kiez-logo.png" className='logoSmall' />
                <div>
                <ProfilePic
                    picture={this.state.picture}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                />
                </div>
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    picture={this.state.picture}
                    onClick={this.showUploader}
                    bio={this.state.bio}
                    setBio={this.setBio}
                    />
                {this.state.uploaderIsVisible && <Uploader setPicture={this.setPicture} />}
                
                </div>
        );

    };
}