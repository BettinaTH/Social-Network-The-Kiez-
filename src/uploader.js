import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        };


   



    // call the function to change the state of profile picture

/*

 getFile(e){
        this.form.file = e.target.files[0];
        console.log(' e inhandlefileChange: ', e);
    };
    var formData = new FormData();
    formData.append('file', this.form.file);

    var self = this;

    componentDidMount(){
        axios.post('/upload', formData)
            .then(function (results){
                this.setState
            }).catch( function(err){
                console.log('err in axios post uplaod:', err);

        });
    }
   */ 
    render (){
        console.log(this.props);
        return(
            <div>
                <p>Want to add a new picture?</p>
                <form>
                 <label htmlFor='file'>Choose file</label>
                    <input type='file' id='file' onChange={e => {
                        e.preventDefault();
                        const form = new FormData;
                        form.append('file', e.target.files[0]);
                        axios.post('/upload', form);
                    }}/>
                    <button>uplaod</button>
                </form>
            </div>
        )
    };

};