import {userConstants} from '../actions/constance'


const initState = {
    error:null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case userConstants.USER_SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_SIGNUP_SUCCESS:{
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        }   
        case userConstants.USER_SIGNUP_FAILURE: {
            state = {
                ...state,
                loading: false,
                message: action.payload.error
            }
            break;
        }
    }
    return state;
}
