import { authConstants } from "./constance"

export const login = (user) =>{

    console.log(user);

    return (dispatch) =>{
        dispatch({
            type:authConstants.LOGIN_REQUEST,
            payload:{
                ...user
            }
        })
    }
}