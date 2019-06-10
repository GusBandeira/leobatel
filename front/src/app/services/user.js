import Api from '../utils/api';

class UserService {
    
    static getSingleUser(id) {
        return Api.get(`User/${id}`);
    }

    static postUser(obj, headers = {}) {
        return Api.post(`User/`, obj, headers);
    }
}

export default UserService;