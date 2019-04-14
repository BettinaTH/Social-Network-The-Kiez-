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
showEditor(){
        this.setState({
             editorIsVisible:true
         })
    }
hideEditor(){
    this.setState({
        editorIsVisible: false
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
        this.hideEditor()
    });

}

    render (){

        return(
            <div>
                <p>Your status / bio:</p>
                <div className="biotext">
                    <div>{this.props.bio}</div>
                    <button className="edit" onClick={this.showEditor}>edit bio</button> 
                </div>
                {this.state.editorIsVisible &&
                    <div className="bioeditor">
                        <textarea className="textarea" onChange={this.changeBio}>{this.props.bio}</textarea>
                        <button type="button" onClick={this.saveBio}> Save </button>
                    </div>
                }
            
            </div>
        )
    };
}