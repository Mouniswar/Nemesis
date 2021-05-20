const INTIAL_state = {
    hasSignedIn: false,
    userdata: null
}

const authReducer = (state = INTIAL_state, action) => {
    switch(action.type) {
        case 'CREATE_USER':
            return {...state, hasSignedIn: true, userdata: action.payload}
        case 'LOGIN_USER':
            return {...state, hasSignedIn: true, userdata: action.payload}
        case 'FETCH_USER':
            return {...state, hasSignedIn: true, userdata: action.payload}
        case 'DELETE_USER':
            return {...state, hasSignedIn: false, userdata: null}
        default:
            return {...state};
    }
}

export default authReducer;