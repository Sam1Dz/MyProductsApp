const initialState = {
    categories: [],
    isLoading: false,
    isFinish: false,
    isError: false
}

export default CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        // GET_DATA_CATEGORIES
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

        // ADD_DATA_CATEGORIES
        case 'ADD_DATA_CATEGORIES_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'ADD_DATA_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                categories: [...state.categories, action.payload.data.data]
            }

        case 'ADD_DATA_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // EDIT_DATA_CATEGORIES
        case 'EDIT_DATA_CATEGORIES_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'EDIT_DATA_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                categories: state.categories.map( categories => (categories.id === action.payload.data.data.id) ? action.payload.data.data : categories)
            }

        case 'EDIT_DATA_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // DELETE_DATA_CATEGORIES
        case 'DELETE_DATA_CATEGORIES_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'DELETE_DATA_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                categories: state.categories.filter( categories => action.payload.data.data.id != categories.id )
            }

        case 'EDIT_DATA_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        default:
            return state;
    }
}