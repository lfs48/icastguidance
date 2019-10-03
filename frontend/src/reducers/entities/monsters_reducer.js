import { merge } from 'lodash';
import * as actionTypes from '../../actions/types';

const monstersReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type){
        default: return state;

    }
};

export default monstersReducer;