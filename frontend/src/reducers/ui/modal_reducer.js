import {merge} from 'lodash';
import * as actionTypes from '../../actions/types';

const modalReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch(action.type) {
        default: return state;

        case (actionTypes.OPEN_MODAL): {
            newState['component'] = action.component;
            return newState;
        }

        case (actionTypes.CLOSE_MODAL): {
            newState['component'] = null;
            return newState;
        }
    }
}

export default modalReducer;