import { authConstants } from "./constance"
import axios from '../helper/axios';

export const login = (user) =>{

    console.log(user);

    return  async (dispatch) =>{

        dispatch({ type: authConstants.LOGIN_REQUEST });
        try {
            const res = await axios.post('/admin/signin', {
                ...user
            })
            if (res.status === 200) {
                const { token, user } = res.data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: { error: res.data.error }
                    })
                }
            }
        }catch (error) {
            console.error('Login error:', error.response);
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: error.response ? error.response.data.error : 'Something went wrong' }
            });
        }

    }
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            })
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: `Faild to login` }
            }) 
        }
    }
}
export const signout = () => {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST})
        const res = await axios.post('/admin/signout');
        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGUOUT_SUCCESS
            })
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error}
            })
        }
    }
}


