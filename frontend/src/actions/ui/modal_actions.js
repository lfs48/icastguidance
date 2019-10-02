import * as actionTypes from '../types';

//Standard actions

export const openModal = (component) => ({
    component: component,
    type: actionTypes.OPEN_MODAL
});

export const closeModal = () => ({
    type: actionTypes.CLOSE_MODAL
});