import { OApi } from '../utils/api';

class MessageService {
    static getMessageList() {
        return OApi.get(`/Message`);
    }
    static postMessage(obj, headers = {}) {
        return OApi.post(`/Message`, obj, headers);
    }
}

export default MessageService;