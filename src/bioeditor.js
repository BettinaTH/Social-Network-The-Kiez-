import React from 'react';


export default class BioEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={};
        this.bio = this.props.bio;
    }
    render (){
        return(
            <div>
                <p>your short bio! edit</p>
                
            </div>
        )
    };
}