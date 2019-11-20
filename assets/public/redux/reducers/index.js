import { combineReducers } from 'redux';

import ProductsReducer from './ProductsReducer';
import CategoriesReducer from './CategoriesReducer';

const appReducer = combineReducers({
    ProductsReducer,
    CategoriesReducer
});

export default appReducer;