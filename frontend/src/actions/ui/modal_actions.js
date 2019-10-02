import * as actionTypes from '../types';

//Standard actions

export const openModal = (component) => ({
    component: component,
    type: actionTypes.OPEN_MODAL
});

export const closeModal = () => ({
    type: actionTypes.CLOSE_MODAL
});

//Thunk actions

export const dispatchOpenModal = (component) => (dispatch) => {
    return (component) => dispatch(openModal(component));
}

export const dispatchCloseModal = () => (dispatch) => {
    return () => dispatch(closeModal());
}