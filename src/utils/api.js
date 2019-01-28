import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};
class Api {

  static get(uri) {
    return axios.get(this.getURL(uri), headers);
  }
  static post(uri, data) {
    return axios.post(this.getURL(uri), data, headers);
  }
  static put(uri, data) {
    return axios.put(this.getURL(uri), data, headers);
  }
  static delete(uri) {
    return axios.delete(this.getURL(uri), headers);
  }

  
  static getURL(uri) {
    return `${BASE_URL}${uri}`;
  }
}


export default Api;