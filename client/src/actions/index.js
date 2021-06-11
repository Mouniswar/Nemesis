import axios from 'axios';
import history from '../history';

export const createUser = formValues => async(dispatch) => {
    const res = await axios.post('http://localhost:8000/api/users', {...formValues});
    localStorage.setItem("token","Bearer " + res.data.token);
    dispatch({type: 'CREATE_USER', payload: res.data})
    history.push('/users')
}


export const loginUser = formValues => async(dispatch) => {
    const res = await axios.post('http://localhost:8000/api/users/login', {...formValues});
    console.log(res);
    localStorage.setItem("token","Bearer "+res.data.token);
    dispatch({type:'LOGIN_USER', payload: res.data});
    history.push('/users')
}


export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8000/api/users/me', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        dispatch({type: 'FETCH_USER', payload: res.data});
        history.push('/users')

        console.log(res.data);
    }
}

export const logoutUser = () => {
    return async(dispatch) => {
        const res = await axios.post('http://localhost:8000/api/users/logout', {
            headers: {
                Authorization: localStorage.removeItem("token")
            }

        })
        console.log(res.data)

        dispatch({type: 'DELETE_USER', payload: res.data});
    }
}

export const CreateFQuestions = formValues => async(dispatch) => {
        const res = await axios.post('http://localhost:8000/api/faq', {...formValues}, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });
        dispatch({type: 'CREATE_FAQ', payload: res.data})
        history.push('/users')
}


export const fetchAllUsers = () => {
    return async(dispatch) => {
        const res = await axios.get('http://localhost:8000/users/all', {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });


        dispatch({type: 'FETCH_FAQS', payload: res.data});
    }
}

export const fetchUserWithId = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });

        console.log(response.data)

        dispatch({type: 'FETCH_FAQ', payload: response.data});
    }
}

export const deleteUser = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:8000/api/users/${id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });

        console.log(response.data)

        dispatch({type: 'DELETE_FAQ', payload: response.data});
    }
}