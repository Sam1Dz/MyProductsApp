const initialState = {
    products: [],
    searchProducts: [],
    totalPage: 0,
    searchTotalPage: 0,
    isLoading: false,
    isLoadingOnNextPage: false,
    isFinish: false,
    isError: false
}

export default ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        // GET_DATA_PRODUCTS
        case 'GET_DATA_PRODUCTS_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'GET_DATA_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                totalPage: action.payload.data.totalPage,
                products: action.payload.data.data
            }

        case 'GET_DATA_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // GET_DATA_PRODUCTS_MORE
        case 'GET_DATA_PRODUCTS_MORE_PENDING':
            return {
                ...state,
			    isLoadingOnNextPage: true
            }

        case 'GET_DATA_PRODUCTS_MORE_FULFILLED':
            return {
                ...state,
                isLoadingOnNextPage: false,
                isFinish: true,
                products: state.products.concat(action.payload.data.data)
            }

        case 'GET_DATA_PRODUCTS_MORE_REJECTED':
            return {
                ...state,
                isLoadingOnNextPage: false,
                isError: true
        }

        // SEARCH_DATA_PRODUCTS
        case 'SEARCH_DATA_PRODUCTS_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'SEARCH_DATA_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                searchTotalPage: action.payload.data.totalPage,
                searchProducts: action.payload.data.data
            }

        case 'SEARCH_DATA_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // SEARCH_DATA_PRODUCTS_MORE
        case 'SEARCH_DATA_PRODUCTS_MORE_PENDING':
            return {
                ...state,
			    isLoadingOnNextPage: true
            }

        case 'SEARCH_DATA_PRODUCTS_MORE_FULFILLED':
            return {
                ...state,
                isLoadingOnNextPage: false,
                isFinish: true,
                searchProducts: state.searchProducts.concat(action.payload.data.data)
            }

        case 'SEARCH_DATA_PRODUCTS_MORE_REJECTED':
            return {
                ...state,
                isLoadingOnNextPage: false,
                isError: true
        }

        // ADD_DATA_PRODUCTS
        case 'ADD_DATA_PRODUCTS_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'ADD_DATA_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: [...state.products, action.payload.data.data]
            }

        case 'ADD_DATA_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // EDIT_DATA_PRODUCTS
        case 'EDIT_DATA_PRODUCTS_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'EDIT_DATA_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: state.products.map( products => (products.id === action.payload.data.data.id) ? action.payload.data.data : products)
            }

        case 'EDIT_DATA_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }

        // DELETE_DATA_PRODUCTS
        case 'DELETE_DATA_PRODUCTS_PENDING':
            return {
                ...state,
			    isLoading: true
            }

        case 'DELETE_DATA_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: state.products.filter( products => action.payload.data.data.id != products.id )
            }

        case 'EDIT_DATA_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
        }
    
        default:
            return state;
    }
}