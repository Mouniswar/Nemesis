import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import faqReducer from './faqReducer';


export default combineReducers({
    form: formReducer,
    auth: authReducer,
    faqs: faqReducer
})