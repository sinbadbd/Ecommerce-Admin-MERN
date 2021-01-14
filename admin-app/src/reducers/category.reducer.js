import { categoryConstants } from "../actions/constance";

const initState = {
    categories: [],
    loading: false,
    error: null,
};



const buildCategories = (parentId, categories, category) => {
    const myCategories = [];

    if(parentId === undefined){ // ONLY PARENT
        return[
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                childreen: []
            }
        ]  
    }


    for (let cat of categories) { 

        if( cat._id === parentId) { // FOR CHILREN

            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                childreen: [],
            }

            myCategories.push({ 
                ...cat,
                childreen: cat.childreen.length > 0 ? [...cat.childreen, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({ 
                ...cat,
                childreen: cat.childreen ? buildCategories(parentId,cat.childreen, category): []
            }) 
        }

    }
    return myCategories; 
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updateCategory = buildCategories(category.parentId , state.categories, category);
            console.log('updateCategory',updateCategory)

            state = {
                ...state,
                categories: updateCategory, 
                loading: false,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
            };
            break;
    }
    return state;
};
