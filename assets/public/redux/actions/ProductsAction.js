import axios from 'axios';

const IPAddress = "http://192.168.43.3:3000/api/v1";

export const getDataProducts = () => {
    return {
        type: 'GET_DATA_PRODUCTS',
        payload: axios.get(`${IPAddress}/get_products`)
    }
}

export const getDataProductsMore = (page) => {
    return {
        type: 'GET_DATA_PRODUCTS_MORE',
        payload: axios.get(`${IPAddress}/get_products?page=${page}`)
    }
}

export const searchDataProducts = (search) => {
    return {
        type: 'SEARCH_DATA_PRODUCTS',
        payload: axios.get(`${IPAddress}/search_products?search=${search}`)
    }
}

export const searchDataProductsMore = (search, page) => {
    return {
        type: 'SEARCH_DATA_PRODUCTS_MORE',
        payload: axios.get(`${IPAddress}/search_products?search=${search}&page=${page}`)
    }
}

export const addDataProducts = (data) => {
    return {
        type: 'ADD_DATA_PRODUCTS',
        payload: axios.post(`${IPAddress}/insert_products`, data)
    }
}

export const editDataProducts = (id, data) => {
    return {
        type: 'EDIT_DATA_PRODUCTS',
        payload: axios.patch(`${IPAddress}/update_products/${id}`, data)
    }
}

export const deleteDataProducts = (id) => {
    return {
        type: 'DELETE_DATA_PRODUCTS',
        payload: axios.delete(`${IPAddress}/delete_products/${id}`)
    }
}