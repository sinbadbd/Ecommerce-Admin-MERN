import {authConstants} from '../actions/constance'

const initState = {
    token: "",
    user:{
        firstName:'',
        lastName:'',
        email:'',
        pofilePicture:''
    },
    authenticate: false,
    authenticating: false
}
export default (state = initState, action) => {
    
    console.log(action)

    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
        }
            
    }
    return state;
}
