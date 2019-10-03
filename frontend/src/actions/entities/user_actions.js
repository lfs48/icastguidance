import * as UsersAPIUtil from '../../util/api/user_api_util';
import * as actionTypes from '../types';

// Standard actions

export const receiveUser = (user) => ({
    type: actionTypes.RECEIVE_USER,
    user: user
});

export const receiveAllUsers = (users) => ({
    type: actionTypes.RECEIVE_ALL_USERS,
    users: users
});

export const receiveSignupErrors = (errors) => ({
    type: actionTypes.RECEIVE_SIGNUP_ERRORS,
    errors: errors
});

// Thunk actions

export const fetchUser = (id) => (dispatch) => {
    return UsersAPIUtil.fetchUser(id).then(
        (user) => dispatch( receiveUser(user) )
    );
};

export const fetchUsers = () => (dispatch) => {
    return UsersAPIUtil.fetchUsers().then(
        (users) => dispatch(receiveAllUsers(users))
    );
};

export const createUser = (formUser) => (dispatch) => {
    return UsersAPIUtil.createUser(formUser).then(
        (res) => dispatch(receiveUser(res.data.user)),
        (errors) => dispatch(receiveSignupErrors(errors.responseJSON))
    );
};