import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import Registration from './register';
import Login from './login';

export function Welcome() {
    return (
        <div id='welcome'>
            <div className='container-homepage'>
                <img src='kiez-logo.png' className='logoBig'/>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>

            </div>
        </div>
    );
}


