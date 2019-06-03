import React from 'react'
import AOS from 'aos'
import withLanguage from '../components/HOCs/withLanguage'

//Import Components
import { CoverImage } from '../components/Page/ImageFrame'
import { Project } from '../components/Page/Project'

// Import images
import cat from '../../images/homelessCat.jpg'

// Import Service
import ProjectsService from '../services/projects'

// Import CSS
import 'app/styles/grid.css'
import 'app/styles/components/links.css'
import 'app/styles/pages/about.css'
import LoadingContent from '../components/Loaders/LoadingContent';

class Projects extends React.Component {

    state = {
        projectsList: [],
        loadingProjects: false
    }

  componentDidMount(){
    AOS.init({ once: true });
    this.getProjectsList();
  }

  getProjectsList = async() => {
    try {
      this.setState({ projectsList: [], loadingProjects: true })
      const { data } = await ProjectsService.getProjectsList()
      this.setState({ projectsList: data, loadingProjects: false })
    }
    catch(e){
      console.log('falha ao gerar lista de projetos')
      this.setState({ projectsList: [], loadingProjects: false })
    }
  }

  render() {
      
    const { state } = this

    return (
        <React.Fragment>
          <CoverImage>
            <img src={cat} alt={'Imagem de ajuda'}/>
          </CoverImage>
          <LoadingContent isLoading={state.loadingProjects}>
            {state.projectsList && state.projectsList.map((proj, index) => <Project project={proj} key={index} index={index} />)}
          </LoadingContent>
        </React.Fragment>
    )
  }
}

export default withLanguage(Projects)