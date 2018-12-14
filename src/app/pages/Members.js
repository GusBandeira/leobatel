import React, { Component } from 'react'
import AOS from 'aos'

// Import translations
//import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'

//Import Components
import { Image, CoverImage } from '../components/ImageFrame'

// Import Service
import MembersService from '../../services/members'

// Import images
import group from '../../images/Group.png'

class Members extends Component {

  state = {
    membersList: [],
    photos: []
  }

  componentDidMount(){
    AOS.init({ once: true });
    this.getNewsList();
  }

  getNewsList = async() => {
    try {
      const { data } = await MembersService.getMembersList()
      this.setState({ membersList: data })
    }
    catch(e){
      console.log('falha ao gerar lista de notícias')
    }
  }

  render() {

    const { state } = this

    return (
      <div className="page page-portfolio page-static">
          <CoverImage>
            <img src={group} alt={'Imagem do grupo'}/>
          </CoverImage>
          <div className="row">
            {state.membersList && state.membersList.map((photo, index) => <Image photo={photo} key={index}/>)}
          </div>
      </div>
    )
  }
}

export default withLanguage(Members)