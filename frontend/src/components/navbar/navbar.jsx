import React from 'react';
import {useDispatch, useStore} from 'react-redux';
import {openModal, dispatchOpenModal} from '../../actions/ui/modal_actions';

export default function Navbar() {

    const dispatch = useDispatch();

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(openModal("register"));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(openModal("login"));
    }

    return(
        <div id="navbar-container">
            <div id="navbar-left-container">
                <button>Monster Creator</button>
            </div>

            <div id="navbar-right-container">
                <span>Welcome</span>
                <button onClick={e => handleRegister(e)}>Register</button>
                <button onClick={e => handleLogin(e)}>Sign In</button>
            </div>
        </div>
        

    
    );
};