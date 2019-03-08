import React from 'react';


export default class BioEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={};
    }
    render (){
        return(
            <div>
                <p>your short bio! edit </p>
                <textarea name="bio" className="TextArea" ></textarea>
                <button type="button"> Save </button>
            </div>
        )
    };
}