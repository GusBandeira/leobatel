import React, { Component } from 'react'
import AOS from 'aos'

// Import translations
import { translates }  from 'translations/translates'
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
    AOS.init();
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

    const { state, props: { language } } = this
    const text = translates[`translation${language}`]

    return (
      <div className="page page-portfolio page-static">
          <CoverImage>
            <img src={group} alt={'Imagem do grupo'}/>
          </CoverImage>
          <div>
            <h1 className="page-heading-h2">{text.members.h1}</h1>
            <h2 className="page-text">{text.members.h2}</h2>
          </div>
          <div className="row">
            {state.membersList && state.membersList.map((photo, index) => <Image photo={photo} key={index}/>)}
          </div>
      </div>
    )
  }
}

export default withLanguage(Members)