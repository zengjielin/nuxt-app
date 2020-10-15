import axios from "axios"

export default {
    login({ commit }, params) {
        return axios.post('/api/authorization/login', params)
    },
}