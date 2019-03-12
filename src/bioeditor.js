import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={},

        this.saveBio = this.saveBio.bind(this);
        this.changeBio = this.changeBio.bind(this);
    }

    changeBio(e){
        this.setState({
            bio: e.target.value
        })
    }
// Porps for editing bio
// save bio axios post & pass prop setBio to parent

saveBio(e){
    e.preventDefault();
    console.log('e:', e)
    axios.post('/bio', {
        bio: this.state.bio   
    }).then(({data}) => {
        console.log('save Bio:', data.bio);
        this.props.setBio(data.bio);
        });
}

    render (){
        return(
            <div>
                <p>your short bio! <button onClick={this.props.showEditor}>edit</button></p>
                <textarea className="textarea" onChange={this.changeBio}></textarea>
                <button type="button" onClick={this.saveBio}> Save </button>
                </div>
        )
    };
}