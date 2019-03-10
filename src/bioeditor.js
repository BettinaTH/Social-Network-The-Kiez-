import React from 'react';


export default class BioEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={};
    }
// Porps for editing bio
// save bio axios post & pass prop setBio to parent

    render (){
        return(
            <div>
                <p>your short bio! <button onClick={this.showEditor}>edit</button></p>
                <textarea name="bio" className="TextArea"></textarea>
                <button type="button"> Save </button>
                </div>
        )
    };
}