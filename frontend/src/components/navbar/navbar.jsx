import React from 'react';

export default function Navbar() {

    const handleRegister = (event) => {
        
    }

    const handleLogin = (event) => {
        
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