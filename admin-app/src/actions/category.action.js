import axios from '../helper/axios';
import { categoryConstants } from "./constance"

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST })

        const res = await axios.get('/category/getcategory');
        console.log(res)

        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        try {
            const res = await axios.post('/category/create', form);
            console.log(res)
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                })
            } else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (error) {
            console.log(error.res)
        }

    }
}


export const updateCategorys = (form) => {
    return async dispatch => {
        const res = await axios.post('/category/update', form);
        console.log("res-update", res)
        if (res.status === 201) {
            return true
        } else {
            return false
        }
    }
}

export const deleteCategorys = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST })
        const res = await axios.post('/category/delete', {
            payload: {
                ids
            }
        });
        if (res.status === 201) {
           // dispatch( getAllCategory())
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS })
            //return true
        } else {
            const { error } = res.data;
            dispatch({ 
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error }
             })
           // return false
        }

    }
}
// export {
//     getAllCategory
// }