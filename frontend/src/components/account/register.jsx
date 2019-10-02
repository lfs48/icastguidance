import React from 'react';

export default function Login() {
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
            </form>
        </div>
    )
};