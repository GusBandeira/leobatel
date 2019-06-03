import Api from '../utils/api';

class MembersService {
    static getMembersList() {
        return Api.get(`Members`);
    }
    static postMember(obj, headers = {}) {
        return Api.post(`Members`, obj, headers);
    }
}

export default MembersService;