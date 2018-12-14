import React from 'react'
import { Row } from 'reactstrap'
import AOS from 'aos'

// Import translations
import withLanguage from '../withLanguage'

// Components
import { Carousel } from '../components/Carousel'
import { NewsLink } from '../components/NewsFrame'

// Import Service
import NewsService from '../../services/news'

class Home extends React.Component {
  
  state = {
    newsList: [],
    homeNewsList: []
  }

  componentDidMount() {
    AOS.init({ once: true });
    this.getNewsList('news');
    this.getNewsList('home');
  }

  getNewsList = async(context) => {
    try {
      if(context === 'news'){
        const { data } = await NewsService.getNewsList()
        this.setState({ newsList: data })
      }
      else if(context === 'home'){
        const { data } = await NewsService.getHomeList()
        this.setState({ homeNewsList: data })
      }
    }
    catch(e){
      console.log('falha ao gerar lista de notícias')
    }
  }

  render() {

    const { state } = this;

    return (
      <div className="page page-home">
        <div className="page-header">
          <Carousel list={state.newsList} />
          <Row>
            {state.homeNewsList.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
          </Row>
        </div>
      </div>
    )
  }
}

export default withLanguage(Home)