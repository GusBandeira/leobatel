import React from 'react'
import { Row } from 'reactstrap'
import AOS from 'aos'
import BlockUi from 'react-block-ui';

// Import translations
import withLanguage from '../withLanguage'

// Components
import { Carousel } from '../components/Carousel'
import { NewsLink } from '../components/NewsFrame'

// Import Service
import NewsService from '../../services/news'
import LoadingContent from '../components/LoadingContent';

class Home extends React.Component {
  
  state = {
    bannerList: [],
    homeNewsList: [],
    bannerLoading: false,
    cardsLoading: false,
  }

  componentDidMount() {
    AOS.init({ once: true });
    this.getBannerList();
    this.getNewsList();
  }

  getBannerList = async() => {
    try {
        this.setState({ bannerList: [], bannerLoading: true })
        const { data } = await NewsService.getBannerList()
        this.setState({ bannerList: data, bannerLoading: false })
    } catch(e){
      this.setState({ bannerList: [], bannerLoading: false })
      //TODO: Mensagem de erro
      console.log('falha ao gerar lista de banners')
    }
  }
  
  getNewsList = async(context) => {
    this.setState({ homeCards: [], cardsLoading: true })
    const { data } = await NewsService.getHomeCards()
    this.setState({ homeCards: data, cardsLoading: false })
  }
  catch(e){
    this.setState({ homeCards: [], cardsLoading: false })
    //TODO: Mensagem de erro
    console.log('falha ao gerar lista de notícias')
  }

  render() {

    const { state } = this;

    return (
      <BlockUi tag="div" blocking={state.bannerLoading} renderChildren={false} className="page page-home" loader={<span className="custom-loader loading g margin-auto" />}>
        <Carousel list={state.bannerList}/>
        <Row>
          <LoadingContent isLoading={state.cardsLoading}>
            {state.homeCards && state.homeCards.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
          </LoadingContent>
        </Row>
      </BlockUi>
    )
  }
}

export default withLanguage(Home)