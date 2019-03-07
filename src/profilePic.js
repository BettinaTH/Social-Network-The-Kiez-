import React from 'react';

export default function ProfilePic(props){
    const image = props.image || '/default.jpg';
    return(
        <img 
        scr={image}
        alt={`${props.first} ${props.last}`}
        onClick={props.onClick}
        />
    )
}