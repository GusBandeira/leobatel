import Api from '../utils/api';

class NewsService {
    static getBannerList() {
        return Api.get(`news/banner`);
    }
    static getHomeCards() {
        return Api.get(`news/home`);
    }
    static getNewsList({ limit, desc }) {
        let queryString = `?
            ${limit ? 'limit=' + limit + '&' : ''}    
            ${desc ? 'sort=-date&' : ''}    
        `
        queryString = queryString.replace(new RegExp(' ', 'g'), '')

        return Api.get(`News${queryString}`);
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