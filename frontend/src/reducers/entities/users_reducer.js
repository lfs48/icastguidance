import { merge } from 'lodash';
import * as actionTypes from '../../actions/types';
import { RECEIVE_USER } from '../../actions/entities/user_actions';
import entitiesReducer from '../ui/ui_reducer';

const usersReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type){
        default: return state;
        
        case(RECEIVE_USER): {
            newState[action.user.id] = action.user;
            return newState;
        }
    }
};

export default usersReducer;