import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/store';

const cb = () => {
    const store = configureStore();
    const root = document.getElementById("root");
    ReactDOM.render(<App  store={store}/>, root);
}

document.addEventListener("DOMContentLoaded", cb);