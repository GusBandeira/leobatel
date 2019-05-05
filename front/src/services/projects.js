import Api from '../utils/api';

class ProjectsService {
    static getProjectsList() {
        return Api.get(`projects/list`);
    }
}

export default ProjectsService;