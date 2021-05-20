import axios from 'axios';
import history from '../history';

export const createUser = (formValues) => {
    console.log(formValues);
    return async(dispatch) => {
        const res = await axios.post('http://localhost:8000/api/users', {...formValues});
        localStorage.setItem("token","Bearer " + res.data.token);
        dispatch({type: 'CREATE_USER', payload: res.data})
        if(res.status === 201) {
            console.log("Status: Okay");
            history.push('/home')
        }
    }
}

export const loginUser = (formValues) => {
    console.log("Action creator called");
    return async(dispatch) => {
        const res = await axios.post('http://localhost:8000/api/users/login', {...formValues});
        console.log(res);
        localStorage.setItem("token","Bearer "+res.data.token);
        dispatch({type:'LOGIN_USER', payload: res.data});
        
        if(res.status === 200) {
            console.log("Status: Okay");
            history.push('/faqs')
        }
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8000/api/users/me', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        dispatch({type: 'FETCH_USER', payload: res.data});
        history.push('/faqs')

        console.log(res.data);
    }
}

export const logoutUser = () => {
    return async(dispatch) => {
        console.log(localStorage.removeItem("token"))
        const res = await axios.post('http://localhost:8000/api/users/logoutAll', {
            headers: {
                Authorization: localStorage.getItem("token")
            }

        })
        console.log(res.data)

        dispatch({type: 'DELETE_USER', payload: res.data});
    }
}

export const CreateFQuestions = (formValues) => {
    console.log(formValues);
   

    return async(dispatch) => {
        const res = await axios.post('http://localhost:8000/api/faq', {...formValues}, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });
        dispatch({type: 'CREATE_FAQ', payload: res.data})
        if(res.status === 201) {
            console.log("Status: Okay");
            history.push('/faqs')
        }
    }
}

export const fetchAllFaqs = () => {
    return async(dispatch) => {
        const res = await axios.get('http://localhost:8000/api/faq', {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });


        dispatch({type: 'FETCH_FAQS', payload: res.data});
    }
}

export const fetchFaq = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:8000/api/faq/${id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });

        console.log(response.data)

        dispatch({type: 'FETCH_FAQ', payload: response.data});
    }
}

export const deleteFaq = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:8000/api/faq/${id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });

        console.log(response.data)

        dispatch({type: 'DELETE_FAQ', payload: response.data});
    }
}