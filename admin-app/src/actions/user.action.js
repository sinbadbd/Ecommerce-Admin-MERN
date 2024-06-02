import { userConstants } from "./constance"
import axios from '../helper/axios';

export const signup = (user) =>{

    console.log(user);

    return  async (dispatch) =>{

        dispatch({ type: userConstants.USER_SIGNUP_REQUEST });
        try {
            const res = await axios.post('/admin/signup', {
                ...user
            })
            if (res.status === 200) {
                const { token, user } = res.data
                dispatch({
                    type: userConstants.USER_SIGNUP_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: userConstants.USER_SIGNUP_FAILURE,
                        payload: { error: res.data.error }
                    })
                }
            }
        }catch (error) {
            console.error('Signup error:', error.response);
            dispatch({
                type: userConstants.LOGIN_FAILURE,
                payload: { error: error.response ? error.response.data.error : 'Something went wrong' }
            });
        }

    }
}