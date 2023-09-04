import Cookies from 'js-cookie';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    function (config) {
        const token = Cookies.get('access_token');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;