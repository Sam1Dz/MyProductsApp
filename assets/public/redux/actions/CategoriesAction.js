import axios from 'axios';

const IPAddress = "http://192.168.43.3:3000/api/v1";

export const getDataCategories = () => {
    return {
        type: 'GET_DATA_CATEGORIES',
        payload: axios.get(`${IPAddress}/get_categories`)
    }
}