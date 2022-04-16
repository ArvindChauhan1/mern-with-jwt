import axios from "axios";

export const baseUrl = "http://localhost:4000/api/v1";

export const http = axios.create({
    baseURL: baseUrl,
});

http.interceptors.request.use(
    function (config) {
        config.headers = {
            'x-access-token': localStorage.getItem('access_token')
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        const { response } = error;
        if (response.status === 400) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
