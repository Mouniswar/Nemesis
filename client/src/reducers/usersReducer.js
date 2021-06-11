import _ from 'lodash';

let INITIAL_STATE = {
    allUsers:[]

}

const usersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CREATE_FAQ':
            return {...state, allUsers:[...state.allUsers, action.payload]}
        case 'FETCH_FAQS':
            return {...state, allUsers:action.payload}
        case 'FETCH_FAQ':
            return {...state, [action.payload._id]:action.payload}
        case 'DELETE_FAQ':
            return _.omit(state, action.payload);

        default:
            return {...state}
    }
}

export default usersReducer;