// Welcome Component
import React from 'react';
import axios from 'axios';
import Registration from './register';

export function Welcome() {
    return (
        <div id='welcome'>
            <div className='container'>
                <img src='kiez-logo.png' className='logoBig'/>
                <Registration />
            </div>
        </div>
    );
}


