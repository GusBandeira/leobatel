import Api from '../utils/api';

class NewsService {
    static getNewsList() {
        return Api.get(`news/list`);
    }
    static getHomeList() {
        return Api.get(`news/home`);
    }
}

export default NewsService;