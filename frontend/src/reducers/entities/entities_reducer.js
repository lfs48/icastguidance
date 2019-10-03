import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import monstersReducer from './monsters_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    monsters: monstersReducer
});

export default entitiesReducer;