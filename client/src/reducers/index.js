import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import usersReducer from './usersReducer';


export default combineReducers({
    form: formReducer,
    auth: authReducer,
    users: usersReducer
})