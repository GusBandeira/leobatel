import React from 'react'
import AOS from 'aos'
import withLanguage from '../withLanguage'

//Import Components
import { CoverImage } from '../components/ImageFrame'
import { Project } from '../components/Project'

// Import images
import cat from '../../images/homelessCat.jpg'

// Import Service
import ProjectsService from '../../services/projects'

// Import CSS
import 'app/styles/grid.css'
import 'app/styles/components/links.css'
import 'app/styles/pages/about.css'

class Projects extends React.Component {

    state = {
        projectsList: []
    }

  componentDidMount(){
    AOS.init({ once: true });
    this.getProjectsList();
  }

  getProjectsList = async() => {
    try {
        const { data } = await ProjectsService.getProjectsList()
        this.setState({ projectsList: data })
    }
    catch(e){
      console.log('falha ao gerar lista de projetos')
    }
  }

  render() {
      
    const { state } = this

    return (
        <React.Fragment>
          <CoverImage>
            <img src={cat} alt={'Imagem de ajuda'}/>
          </CoverImage>
          {state.projectsList && state.projectsList.map((proj, index) => <Project project={proj} key={index} index={index} />)}
        </React.Fragment>
    )
  }
}

export default withLanguage(Projects)