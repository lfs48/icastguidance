import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';
import uiReducer from './ui/ui_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer
});

export default rootReducer;