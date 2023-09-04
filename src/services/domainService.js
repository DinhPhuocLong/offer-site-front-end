import apiService from './apiService';
const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

export function getDomains() {
    return apiService.get(`${baseUrl}/domain`)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when fetching data');
        });
}

