import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome';
import App from './app';
import * as io from 'socket.io-client';
/// REDUX 
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import{Provider} from 'react-redux';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
////

// const socket = io.connect();
// socket.emit('hi',{
//     funkc: chciken
// })

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />
} else {
    elem = (
        <Provider store = { store }>
            <App/>
        </Provider>
        );
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
