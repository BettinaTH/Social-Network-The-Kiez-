import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={},

        this.saveBio = this.saveBio.bind(this);
        this.changeBio = this.changeBio.bind(this);
        this.showEditor = this.showEditor.bind(this);
    }

    changeBio(e){
        this.setState({
            bio: e.target.value
        })
    }
// Porps for editing bio
// save bio axios post & pass prop setBio to parent
showEditor(){
        this.setState({
             editorIsVisible:true
         })
    }


saveBio(e){
    e.preventDefault();
    console.log('e:', e)
    axios.post('/bio', {
        bio: this.state.bio   
    }).then(({data}) => {
        console.log('save Bio:', data);
        this.props.setBio(data[0].bio);
        });

}

    render (){

        return(
            <div>
                <p>What do you like? Who are you?<button onClick={this.showEditor}>edit</button></p> 
                <div className='biotext'>{this.props.bio}</div>
             
                {this.state.editorIsVisible &&
                    <div className='bioeditor'>
                        <textarea className="textarea" onChange={this.changeBio}></textarea>
                        <button type="button" onClick={this.saveBio}> Save </button>
                    </div>
                }
            </div>
        )
    };
}