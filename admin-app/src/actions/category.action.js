import axios from '../helper/axios';
import { categoryConstants } from "./constance"

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({type: categoryConstants.GET_ALL_CATEGORY_REQUEST})

        const res = await axios.get('/category/getcategory');
        console.log(res)

        if(res.status === 200){
            const { categoryList } = res.data;
            dispatch({
                 type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                 payload: {categories: categoryList}
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
           })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({type: categoryConstants.ADD_NEW_CATEGORY_REQUEST})
        const res = await axios.post('/category/create', form);
        console.log(res)
         if (res.status === 201){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: {category: res.data.category}
            })
        }else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            })
        }
    }
}


export const updateCategorys = (form) => {
    return async dispatch => {
        // dispatch({type: categoryConstants.ADD_NEW_CATEGORY_REQUEST})
        const res = await axios.post('/category/update', form);
        console.log("res-update",res)
         if (res.status === 201){
            console.log("res",res)
            // dispatch({
            //     // type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            //     // payload: {category: res.data.category}
            // })
        }else {
            console.log(res)
            // dispatch({
            //     // type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            //     // payload: res.data.error
            // })
        }
    }
}