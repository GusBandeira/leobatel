import React, { Component } from 'react'
import AOS from 'aos'

// Import translations
//import { translates }  from 'translations/translates'
import withLanguage from '../components/HOCs/withLanguage'

//Import Components
import { Image, CoverImage } from '../components/Page/ImageFrame'
import LoadingContent from '../components/Loaders/LoadingContent'

// Import Service
import MembersService from '../services/members'

// Import images
import group from '../../images/Group.png'

class Members extends Component {

  state = {
    membersList: [],
    membersLoading: false
  }

  componentDidMount(){
    AOS.init({ once: true });
    this.getNewsList();
  }

  getNewsList = async() => {
    try {
      this.setState({ membersLoading: true })
      const { data } = await MembersService.getMembersList()
      this.setState({ membersList: data, membersLoading: false })
    }
    catch(e){
      console.log('falha ao gerar lista de notícias')
      this.setState({ membersList: [], membersLoading: false })
    }
  }

  render() {

    const { state } = this

    return (
      <div className="page page-portfolio page-static">
          <CoverImage>
            <img src={group} alt={'Imagem do grupo'}/>
          </CoverImage>
          <LoadingContent isLoading={state.membersLoading} className="margin-auto">
            <div className="row">
              {state.membersList && state.membersList.map((photo, index) => <Image photo={photo} key={index}/>)}
            </div>
          </LoadingContent>
      </div>
    )
  }
}

export default withLanguage(Members)