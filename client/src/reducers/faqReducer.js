import _ from 'lodash';

let INITIAL_STATE = {
    frequentquestions:[]

}

const friendsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CREATE_FAQ':
            return {...state, frequentquestions: action.payload}
        case 'FETCH_FAQS':
            return {...state, frequentquestions:action.payload}
        case 'FETCH_FAQ':
            return {...state, frequentquestions:action.payload}
        case 'DELETE_FAQ':
            return _.omit(state, action.payload);

        default:
            return {...state}
    }
}

export default friendsReducer;