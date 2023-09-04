import apiService from './apiService';
const baseUrl =
    import.meta.env.VITE_API_BASE_URL;

export function getOffers(page = 1, perPage = 5) {
    return apiService.get(`${baseUrl}/offer?page=${page}&per_page=${perPage}`)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when fetching data');
        });
}

export function getOfferDetail(id) {
    return apiService.get(`${baseUrl}/offer/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when fetching data');
        })
}

export function addOffer(offer) {
    return apiService.post(`${baseUrl}/offer`, offer)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when adding offer');
        })
}

export function updateOffer(id, offer) {
    return apiService.put(`${baseUrl}/offer/${id}`, offer)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error('Something went wrong when updating offer');
        });
}
