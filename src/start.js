import React from 'react';
import ReactDOM from 'react-dom';


import {Welcome} from './welcome';

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />
} else {
    elem = <img src="kiez-logo.png" className='logoSmall' />;
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);


/*
ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}*/
