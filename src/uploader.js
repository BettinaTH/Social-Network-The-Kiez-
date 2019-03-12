import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        };

// proflepic does not appears directly to react then(({data}) => {
        // console.log('save Bio:', data);
        // this.props.setBio(data[0].bio);
        // });
    render (){
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
                    <button>upload</button>
                </form>
            </div>
        )
    };

};