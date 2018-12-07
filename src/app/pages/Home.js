import React from 'react'
import  { Link } from 'react-router-dom'
import  styled from 'styled-components'
import { Row } from 'reactstrap'
import AOS from 'aos'

// Import translations
import withLanguage from '../withLanguage'

// Components
import { Carousel } from 'react-responsive-carousel'
import { NewsLink } from '../components/NewsFrame'

// Import Service
import NewsService from '../../services/news'

// Data
import { HomeNewsList } from '../Models/HomeNews'

const BannerImage = styled.img`
  object-fit: cover;
  object-position: ${props => props.cover || "30% 30%"};
  height: 600px;
  width: 100vw;
`
const BannerShadow = styled.div`
  width: 100%;
  height: 600px;
  position: absolute;
  bottom: 0;
  color: transparent;

  -webkit-box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
  -moz-box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
  box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
`
const BannerTitle = styled.div`
  height: 300px !important;
  position: absolute;
  top: 50% !important;
  color: white;
  padding-top: 150px;
  display: inline-grid;
  left: 10%;
  right: 10%;

  span {
    text-align: center;
    width: 960px;
    margin: 0 auto;
  }
  span:first-child{
    font-size: 36px;
    margin: auto;
    
  }
  span:nth-child(2){
    font-size: 22px;
  }
  @media screen and (max-width: 576px) {
    span:first-child{
      font-size: 22px;
    }
    span:nth-child(2){
      font-size: 16px;
    }
  }
`
const CarousselContainer = styled.div`
  height: 600px;
`
class Home extends React.Component {
  
  state = {
    newsList: [],
    homeNewsList: []
  }

  componentDidMount() {
    AOS.init();
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

  renderCarousel(list) {
    return list.map((banner, index) => (
      <Link to={banner.link} key={index}>
        <BannerShadow/>
          <BannerTitle className='row'>
            <span>
              {banner.name}
            </span>
            <span>
              {banner.subtitle}
            </span>
          </BannerTitle>
        <BannerImage src={`data:image/png;base64, ${banner.banner}`} alt={banner.name} height='600' cover={banner.cover}/>
      </Link>
    ))
  }

  render() {

    const { state } = this;

    return (
      <div className="page page-home">
        <div className="page-header">
          <CarousselContainer>
            <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover={false} interval={10000} showStatus={false}>
              {this.renderCarousel(state.newsList)}
            </Carousel>
          </CarousselContainer>
          <Row>
            {state.homeNewsList.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
          </Row>
        </div>
      </div>
    )
  }
}

export default withLanguage(Home)