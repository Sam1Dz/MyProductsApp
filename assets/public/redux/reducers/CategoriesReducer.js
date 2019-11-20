const initialState = {
    categories: [],
    isLoading: false,
    isFinish: false,
    isError: false
}

export default CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA_CATEGORIES_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'GET_DATA_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                categories: action.payload.data.data
            }

        case 'GET_DATA_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }
    
        default:
            return state;
    }
}