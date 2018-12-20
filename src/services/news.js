import Api from '../utils/api';

class NewsService {
    static getBannerList() {
        return Api.get(`news/banner`);
    }
    static getHomeCards() {
        return Api.get(`news/home`);
    }
    static getNewsList() {
        // return Api.get(`news/list`);
        return new Promise(async (resolve, reject) => {
          setTimeout(() => reject({response:{data:'', status: 500 }}), 1000  )
        }) ;
    }
}

export default NewsService;