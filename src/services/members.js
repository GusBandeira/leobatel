import Api from '../utils/api';

class MembersService {
    static getMembersList() {
        return Api.get(`members/list`);
    }
}

export default MembersService;