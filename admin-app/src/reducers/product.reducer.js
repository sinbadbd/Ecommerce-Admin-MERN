import { productConstants } from "../actions/constance";

const initState = {
    products: [],
    loading: false,
    error: null,
};

export default (state = initState, action) => {
    switch (action.type){
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                isLoading: false,
            }
            break;
    }

    return state;
}