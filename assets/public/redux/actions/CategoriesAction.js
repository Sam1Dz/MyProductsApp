import axios from 'axios';

const IPAddress = "http://192.168.43.3:3000/api/v1";

export const getDataCategories = () => {
    return {
        type: 'GET_DATA_CATEGORIES',
        payload: axios.get(`${IPAddress}/get_categories`)
    }
}

export const addDataCategories = (data) => {
    return {
        type: 'ADD_DATA_CATEGORIES',
        payload: axios.post(`${IPAddress}/insert_categories`, data)
    }
}

export const editDataCategories = (id, data) => {
    return {
        type: 'EDIT_DATA_CATEGORIES',
        payload: axios.patch(`${IPAddress}/update_categories/${id}`, data)
    }
}

export const deleteDataCategories = (id) => {
    return {
        type: 'DELETE_DATA_CATEGORIES',
        payload: axios.delete(`${IPAddress}/delete_categories/${id}`)
    }
}