import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../actions/ui/modal_actions';
import {createUser} from '../../actions/entities/user_actions';

export default function Register() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password
        };
        dispatch(createUser(user));
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch(closeModal());
    }
    
    const handleInput = (event, stateFunction) => {
        event.preventDefault();
        stateFunction(event.target.value);
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
                    value={username}
                    onChange={e => handleInput(e, setUsername)}
                ></input>
                <label htmlFor="password-input">
                    Password
                </label>
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={e => handleInput(e, setPassword)}
                ></input>
                <button onClick={e => handleRegister(e)}>
                    Sign Up
                </button>
                <button onClick={e => handleCancel(e)}>
                    Cancel
                </button>
            </form>
        </div>
    )
};