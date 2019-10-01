  
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type){
        default: return state;
    }
}