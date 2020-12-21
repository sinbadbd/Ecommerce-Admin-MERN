import axios from '../helper/axios';
import { initialDataConstants, productConstants, categoryConstants } from "./constance";
 
export const getInitialData = () => {
    return async dispatch => { 

        const res = await axios.post('/initalData');

    
        if (res.status === 200) {
            const { categories, products} = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({ 
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: { products }
            })
        }

        console.log('ininitialData',res)
         
    }
    
}