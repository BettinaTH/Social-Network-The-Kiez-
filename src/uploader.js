import React from 'react';

export default class Uploader extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        };


    getFile(){
        this.form.file = e.target.files[0];
        console.log(' e inhandlefileChange: ', e);
    };



    // call the function to change the state of profile picture

/*
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
                <input type = 'file' accept = 'image/*' name = 'file' />
                <button onClick = 'getFile()' >upload</button>
            </div>
        )
    };

};