import React from 'react';

export default function ProfilePic(props){
    const picture = props.picture || 'default.png';
    return(
            <img
            src={picture}
            alt={`${props.first} ${props.last}`}
            onClick={props.onClick}
        />
    
    )
}