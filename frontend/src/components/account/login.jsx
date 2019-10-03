import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {closeModal} from '../../actions/ui/modal_actions';
import {login} from '../../actions/session/session_actions';

export default function Login() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        const credentials = {
            username: username,
            password: password
        };
        dispatch(login(credentials));
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
        <div id="login-container">
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
                <button onClick={e => handleLogin(e)}>
                    Log In
                </button>
                <button onClick={e => handleCancel(e)}>
                    Cancel
                </button>
            </form>
        </div>
    )
};