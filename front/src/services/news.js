import Api from '../utils/api';

class NewsService {
    static getBannerList() {
        return Api.get(`news/banner`);
    }
    static getHomeCards() {
        return Api.get(`news/home`);
    }
    static getNewsList(limit) {
        return Api.get(`News${limit ? '?limit=' + limit : ''}`);
        // return new Promise(async (resolve, reject) => {
        //   setTimeout(() => reject({response:{data:'', status: 500 }}), 1000  )
        // }) ;
    }

    static getSingleNews(id) {
        return Api.get(`News/${id}`);
    }

    static postNews(obj, headers = {}) {
        return Api.post(`News`, obj, headers);
    }
}

export default NewsService;