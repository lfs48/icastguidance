import { merge } from 'lodash';
import * as actionTypes from '../../actions/types';

const usersReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type){
        default: return state;
        
        case(actionTypes.RECEIVE_USER): {
            newState[action.user.id] = action.user;
            return newState;
        }
    }
};

export default usersReducer;