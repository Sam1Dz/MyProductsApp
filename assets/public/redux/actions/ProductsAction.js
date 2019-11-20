import axios from 'axios';

const IpAddress = "http://192.168.43.3:3000/api/v1";

export const getDataProducts = () => {
    return {
        type: 'GET_DATA_PRODUCTS',
        payload: axios.get(`${IpAddress}/get_products`)
    }
}

export const searchDataProducts = (search) => {
    return {
        type: 'SEARCH_DATA_PRODUCTS',
        payload: axios.get(`${IpAddress}/search_products?search=${search}`)
    }
}

export const addDataProducts = (data) => {
    return {
        type: 'ADD_DATA_PRODUCTS',
        payload: axios.post(`${IpAddress}/insert_products`, data)
    }
}

export const editDataProducts = (id, data) => {
    return {
        type: 'EDIT_DATA_PRODUCTS',
        payload: axios.patch(`${IpAddress}/update_products/${id}`, data)
    }
}

export const deleteDataProducts = (id) => {
    return {
        type: 'DELETE_DATA_PRODUCTS',
        payload: axios.delete(`${IpAddress}/delete_products/${id}`)
    }
}