import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_STRAPI_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_STRAPI_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
});