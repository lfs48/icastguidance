import React from 'react';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../actions/ui/modal_actions';

export default function Register() {

    const dispatch = useDispatch();

    const handleRegister = (event) => {
        event.preventDefault();
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch(closeModal());
    }

    return(
        <div id="register-container">
            <form>
                <label htmlFor="username-input">
                    Username
                </label>
                <input
                    id="username-input"
                    type="text"
                ></input>
                <label htmlFor="password-input">
                    Password
                </label>
                <input
                    id="password-input"
                    type="password"
                ></input>
                <button onClick={e => handleRegister(e)}>
                    Log In
                </button>
                <button onClick={e => handleCancel(e)}>
                    Cancel
                </button>
            </form>
        </div>
    )
};