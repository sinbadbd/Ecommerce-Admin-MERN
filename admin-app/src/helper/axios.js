import axios from 'axios';
import { api } from '../UrlConfig';
import store from '../store';
import { authConstants } from '../actions/constance';

const token =  window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : '' 
    }
});

 
axiosInstance.interceptors.request.use((req) => { // Req new token
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }

    return req;
 });

// Add a request interceptor
axiosInstance.interceptors.request.use((res) => {
   return res
}, (error)=> {
    console.log("interceptor", error.response);
    const { status } = error.response;
    if (status === 500 || status === 400){
        localStorage.clear()
        store.dispatch( { type: authConstants.LOGUOUT_SUCCESS })
    }
});

export default axiosInstance;