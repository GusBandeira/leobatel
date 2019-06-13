import Api from '../utils/api';

class UserService {
    
    static getSingleUser(id) {
        return Api.get(`/User/${id}`);
    }

    static postUser(obj, headers = {}) {
        return Api.post(`/User/`, obj, headers);
    }
    static postChangePassword(obj, headers = {}) {
        return Api.post(`/password`, obj, headers);
    }
}

export default UserService;