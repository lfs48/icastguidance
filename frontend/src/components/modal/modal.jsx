import React from 'react';
import {useSelector} from 'react-redux';
import Login from '../account/login';
import Register from '../account/register';

export default function Modal() {
    let content;
    const component = useSelector(state => state.ui.modal.component);
    switch(component) {
        default: {
            content = <></>;
            break;
        }
        case("login"): {
            content = <Login />;
            break;
        } 
        case("register"): {
            content = <Register/>;
            break;
        }
    }
    if (component) {
        return(
            <div id="modal" onClick={e => e.stopPropagation()}>
                {content}
            </div>
        );
    } else {
        return (<></>);
    }
};