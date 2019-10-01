import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer
});

export default rootReducer;