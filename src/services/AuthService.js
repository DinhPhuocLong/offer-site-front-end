import axios from 'axios';
import Cookies from 'js-cookie';
import apiService from './apiService';
const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

export function login(credentials) {
    return axios.post(`${baseUrl}/login`, credentials)
        .then(response => {
            const token = response.data.access_token;
            Cookies.set('access_token', token, {
                expires: 1
            });
            return response.data;
        })
        .catch(() => {
            throw new Error('Login failed');
        })
}

export function logout() {
    return apiService.post(`${baseUrl}/logout`)
        .then(response => {
            console.log(response);
            Cookies.remove('access_token');
            window.location.href = '/login';
        })
        .catch(() => { throw new Error('Something went wrong when loging out!') });
}

export function isLoggedIn() {
    return Cookies.get('access_token');
}
