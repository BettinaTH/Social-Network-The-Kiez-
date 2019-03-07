import React from 'react';
import axios from './axios';
//import uploader from '/uploader';
//import Navbar from 'navbar';
import ProfilePic from './profilepic';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uploaderIsVisible: false
        }
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);

    }

    showUploader(){
        this.setState({
            uploaderIsVisible: true
        })
    };

    setImage(picture){
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
                <ProfilePic
                    picture={this.state.picture}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
            </div>
        );

    };
}