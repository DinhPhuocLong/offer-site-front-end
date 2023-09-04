import apiService from '@/services/apiService';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const initialState = {
    users: [],
    authUser: null
};

const userModule = {
    state: {
        ...initialState
    },
    mutations: {
        SET_AUTH_USER(state, authUser) {
            state.authUser = authUser;
        }

    },
    actions: {
        async getAuthUser({ commit }) {
            try {
                const response = await apiService.get(`${baseUrl}/profile`);
                commit('SET_AUTH_USER', response.data.user)
            } catch (error) {
                console.log(error);
            }

        }
    },
    getters: {
        getAuthUser(state) { return state.authUser },
    },
    modules: {

    },
};

export default userModule;
