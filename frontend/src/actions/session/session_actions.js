import * as SessionAPIUtil from '../../util/api/session_api_util';
import * as UserActions from '../entities/user_actions';

// Standard actions

// Thunk actions

export const login = (credentials) => (dispatch) => {
    return SessionAPIUtil.login(credentials)
    .then( (res) => dispatch(UserActions.receiveUser(res.data.user) ) );
};