import axios from '../helper/axios';
import { categoryConstants } from "./constance"

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({type: categoryConstants.GET_ALL_CATEGORY_REQUEST})

        const res = await axios.get('/category/getCategories');
        console.log(res)
        const { categoryList } = res.data
        if(res === 2000){
            dispatch({
                 type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                 payload: {category: categoryList}
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
           })
        }
    }
}