import apiService from './apiService';
const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

export function getNetworks() {
    return apiService.get(`${baseUrl}/network`)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when fetching data');
        });
}

export function showNetworkPostbackUrls(id) {
    return apiService.get(`${baseUrl}/network/pb?id=${id}`)
    .then(response => {
        return response.data;
    })
    .catch(() => {
        throw new Error('Something went wrong when fetching data');
    });
}

export function addNetwork(networkData) {
    return apiService.post(`${baseUrl}/network`, networkData)
    .then(response => {
        return response.data
    })
    .catch(() => {
        throw new Error('Something went wrong when adding network');
    });
}

export function editNetwork(id, networkData) {
    return apiService.put(`${baseUrl}/network/${id}`, networkData)
    .then(response => {
        return response.data
    })
    .catch(() => {
        throw new Error('Something went wrong when adding network');
    });
}

export function removeNetwork(id) {
    return apiService.delete(`${baseUrl}/network?id=${id}`)
    .then(response => {
        return response.data;
    })
    .catch(() => {
        throw new Error('Something went wrong when deleting network');
    })
}