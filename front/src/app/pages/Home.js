import React from 'react'
import { Row } from 'reactstrap'
import AOS from 'aos'
import BlockUi from 'react-block-ui';

// Import translations
import withLanguage from '../components/HOCs/withLanguage'

// Components
import { Carousel } from '../components/Slider/Carousel'
import { NewsLink } from '../components/News/NewsFrame'
import { LoadingImage } from '../components/Loaders/Loaders'

// Import Service

import NewsService from '../services/news'

// Import Images
import LEOBatelLogo from '../../images/LEOBatelLogoPB.png'

// Import Models
import { HomeNews } from '../models/NewsModel'

class Home extends React.Component {
  
  state = {
    bannerList: [],
    homeNewsList: [],
    homeCards: HomeNews, 
    bannerLoading: false,
    cardsLoading: false,
  }

  componentDidMount() {
    AOS.init({ once: true });
    this.getBannerList();
    //this.getNewsList();
  }

  getBannerList = async() => {
    try {
        this.setState({ bannerList: [], bannerLoading: true })
        const { data } = await NewsService.getNewsList({ limit: 5, desc: true })
        this.setState({ bannerList: data, bannerLoading: false })
    } catch(e){
      
      this.setState({ bannerList: [], bannerLoading: false })
      //TODO: Mensagem de erro
      console.log('falha ao gerar lista de banners')
    }
  }
  
  // getNewsList = async(context) => {
  //   this.setState({ homeCards: [], cardsLoading: true })
  //   const { data } = await NewsService.getHomeCards()
  //  this.setState({ homeCards: data, cardsLoading: false })
  // }
  // catch(e){
  //   this.setState({ homeCards: [], cardsLoading: false })
  //   //TODO: Mensagem de erro
  //   console.log('falha ao gerar lista de notícias')
  // }

  render() {

    const { state } = this;

    return (
      <BlockUi tag="div" blocking={state.bannerLoading} renderChildren={false} className="page page-home" loader={<LoadingImage src={LEOBatelLogo} alt="Logo Leo Batel"/>}>
        <Carousel list={state.bannerList}/>
        <Row>
          {state.homeCards && state.homeCards.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
        </Row>
      </BlockUi>
    )
  }
}

export default withLanguage(Home)