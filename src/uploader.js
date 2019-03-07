import React from 'react';

export default class Uploader extends React.Component (props){
    constructor(props){
        super(props);
        this.state={};
        };


    getFile(e) {
        this.form.file = e.target.files[0];
        console.log(' e inhandlefileChange: ', e);
    };

    handleFileChange(e){
        this.form.file = e.target.files[0];
        console.log(' e inhandlefileChange: ', e);
    };

/*
    var formData = new FormData();
    formData.append('file', this.form.file);

    var self = this;
*/
componentDidMount(){
    axios.post('/upload', formData)
        .then(function (results){
            SetImage
        }).catch( function(err){
            console.log('err in axios post uplaod:', err);

        });
    }
    
    render (){
        return(
            <div>
                <p>Want to add a new picture?</p>
                <input type = 'file' accept = 'image/*' name = 'file' onchange = 'handleFileChange'/>
                <button onClick = 'getFile'>upload</button>

            </div>
        )
    };

};