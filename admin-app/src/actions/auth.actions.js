import { authConstants } from "./constance"
import axios from '../helper/axios';

export const login = (user) =>{

    console.log(user);

    return  async (dispatch) =>{

        dispatch({type: authConstants.LOGIN_REQUEST});
        const res = await axios.post('/admin/signin',{

            ...user
        })
        if (res.status === 200){
            const { token, user} = res.data
            localStorage.setItem('token',token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            })
        }else{
            if(res.status === 4000){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }

    }
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = localStorage.getItem('user');
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            })
        }else{
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { error: `Faild to login` }
            }) 
        }
    }
}
export const signout = () => {
    return async dispatch => {
        localStorage.clear();
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
    }
}


