import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './message_reducer'
import authReducer from './auth_reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    message:messageReducer,
    form: formReducer,
});

export default rootReducer;
