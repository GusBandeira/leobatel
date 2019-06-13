import axios from 'axios';

import { API_BASE_URL, OPEN_BASE_URL } from '../utils/constants'

axios.interceptors.request.use(
    config => {
        if (localStorage.leo_user) {
            config.headers.authorization = JSON.parse(localStorage.leo_user).token
        }
        return config;
      },
    error => Promise.reject(error)
);


class Api {

    static get(uri) {
        return axios.get(this.getURL(uri));
    }
    static post(uri, data, headers = {}) {
        return axios.post(this.getURL(uri), data, headers);
    }
    static put(uri, data) {
        return axios.put(this.getURL(uri), data);
    }
    static delete(uri) {
        return axios.delete(this.getURL(uri));
    }


    static getURL(uri) {
        return `${API_BASE_URL}${uri}`;
    }
}
export class OApi {

    static get(uri) {
        return axios.get(this.getURL(uri));
    }
    static post(uri, data, headers = {}) {
        return axios.post(this.getURL(uri), data, headers);
    }
    static put(uri, data) {
        return axios.put(this.getURL(uri), data);
    }
    static delete(uri) {
        return axios.delete(this.getURL(uri));
    }


    static getURL(uri) {
        return `${OPEN_BASE_URL}${uri}`;
    }
}


export default Api;