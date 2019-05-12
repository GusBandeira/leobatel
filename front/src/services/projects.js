import Api from '../utils/api';

class ProjectsService {
    static getProjectsList() {
        return Api.get(`Projects`);
    }
    static postProject(obj, headers = {}) {
        return Api.post(`Projects`, obj, headers);
    }
}

export default ProjectsService;