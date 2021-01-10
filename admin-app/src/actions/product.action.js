import axios from "../helper/axios";
import { productConstants } from "./constance";

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
        const res = await axios.post("product/create", form);
        console.log(res);
        if (res.status === 201) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: { product: res.data.product },
            });
        } else {
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_FAILURE,
                payload: res.data.error,
            });
        }
    };
};
