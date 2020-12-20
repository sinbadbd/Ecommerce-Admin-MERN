import axios from '../helper/axios';
// import { categoryConstants } from "./constance"

export const addProduct = (form) => {
    return async dispatch => {
        const res = await axios.post('product/create', form);
       console.log(res)
        if (res.status === 2000){

        }
    }
}