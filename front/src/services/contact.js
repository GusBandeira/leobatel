import Api from '../utils/api';

class ContactService {
    static postContact(object) {
        return Api.post(`contact`, object);
    }
}

export default ContactService;