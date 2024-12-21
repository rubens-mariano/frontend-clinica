import axios from 'axios';

const createAxiosInstance = async () => {
    const token = localStorage.getItem('@auth_token');

    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
};

export default createAxiosInstance;