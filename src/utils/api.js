import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

class Api {

  static get(uri) {
    return axios.get(this.getURL(uri));
  }
  static post(uri, data) {
    return axios.post(this.getURL(uri), data);
  }
  static put(uri, data) {
    return axios.put(this.getURL(uri), data);
  }
  static delete(uri) {
    return axios.delete(this.getURL(uri));
  }

  
  static getURL(uri) {
    return `${BASE_URL}${uri}`;
  }
}


export default Api;