import React from 'react';
import axios from './axios';
import Uploader from './uploader';
import Profile from './profile';
import ProfilePic from './profilepic';
import OtherProfile from './otherprofile';
import Friends from './friends';
import OnlineUsers from './online';
import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uploaderIsVisible: false,
            editorIsVisible: false,
            bio: {},
        }
        this.showUploader = this.showUploader.bind(this);
        this.setPicture = this.setPicture.bind(this);
        this.setBio = this.setBio.bind(this);

    }

    showUploader(){
        this.setState({
            uploaderIsVisible: true
        })
    }

    setPicture(picture){
        this.setState({picture, uploaderIsVisible: false})
    }

    setBio(bio){
        this.setState({bio, editorIsVisible: false})
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
                console.log('this.state.id in render app js.: ', this.state.id)
            return null;
        }
        return(
            <div>
                <div className="container-row">
                    <a href="/"><img src="/kiez-logo.png" className='logoSmall'/></a>
                        <div className="container-left">
                            <div className="pic-name">
                                <div className="smallPic">
                                    <ProfilePic
                                        id={this.state.id}
                                        picture={this.state.picture}
                                        first={this.state.first}
                                        last={this.state.last}
                                        onClick={this.showUploader}
                                    />
                                </div>    
                                {this.state.uploaderIsVisible && <Uploader setPicture={this.setPicture} />}
                                <div className="user-name">{this.state.first}</div>
                            </div>
                            <a href="/friends"><button > FRIENDS </button></a>
                            <a href="/online-users"><button > ONLINE </button></a>
                        </div>
                    <div>    
                        <a href="/logout"><button > Back to the real KIEZ </button></a>
                    </div>
                </div>
                    <BrowserRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        picture={this.state.picture}
                                        onClick={this.showUploader}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                        showEditor={this.showEditor}
                                        editorIsVisible={this.state.editorIsVisible}
                                    /> 
                                )}
                            />
                            <Route
                                    path="/user/:id"
                                    render={props => (
                                        <OtherProfile
                                            key={props.match.url}
                                            match={props.match}
                                            history={props.history}
                                            myId={this.state.id}
                                        />
                                    )}
                            />
                            <Route
                                    path="/friends"
                                    render={() => (
                                        <Friends/>
                                    )}
                            />
                            <Route
                                    path="/online-users"
                                    render={() => (
                                        <OnlineUsers/>
                                    )}
                            />

                        </div>
                    </BrowserRouter>  
            </div>
        );

    };
}