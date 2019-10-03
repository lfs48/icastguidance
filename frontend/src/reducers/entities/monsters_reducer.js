import { merge } from 'lodash';
import * as actionTypes from '../../actions/types';

const monstersReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type){
        default: return state;

        case(actionTypes.RECEIVE_MONSTER): {
            newState[action.monster._id] = action.monster;
            return newState;
        }
    }
};

export default monstersReducer;