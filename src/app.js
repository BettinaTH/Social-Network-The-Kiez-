import React from 'react';
import axios from 'axios';
//import uploader from '/uploader';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    showUploader(){
        this.stetState({
            uploaderIsVisible: true
        })
    };

    setImage(iamge){
        this.setState({picture})
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

            // profilePic
            //uploader
            // {this.state.uploaderIsVisible &&<Uploader/>}
            <div>
                <img src="kiez-logo.png" className='logoSmall' />
               
            </div>
        );

    };
}