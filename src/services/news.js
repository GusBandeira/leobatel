import Api from '../utils/api';

class NewsService {
    static getBannerList() {
        return Api.get(`news/banner`);
    }
    static getNewsList() {
        return Api.get(`news/list`);
    }
}

export default NewsService;