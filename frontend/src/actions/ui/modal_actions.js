import * as actionTypes from '../types';

//Standard actions

export const openModal = (component) => ({
    component: component,
    type: actionTypes.OPEN_MODAL
});

//Thunk actions

export const dispatchOpenModal = (component) => (dispatch) => {
    return (component) => dispatch(openModal(component));
}