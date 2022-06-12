import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});