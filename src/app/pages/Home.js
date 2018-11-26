import React from 'react'
import  { Link } from 'react-router-dom'
import  styled from 'styled-components'
import { Row } from 'reactstrap'

// Import translations
import withLanguage from '../withLanguage'

// Components
import { Carousel } from 'react-responsive-carousel'
import { NewsLink } from '../components/NewsFrame'

// Data
import { NewsListModel } from '../Models/NewsListModel'
import { HomeNewsList } from '../Models/HomeNews'

const BannerImage = styled.img`
  object-fit: cover;
  object-position: ${props => props.coverCenter || "30% 30%"};
  height: 600px;
  width: 100vw;
`
const BannerShadow = styled.div`
  width: 100%;
  height: 400px;
  position: absolute;
  bottom: 0;
  color: transparent;

  -webkit-box-shadow: inset 0px -225px 300px -65px rgba(0,0,0,0.9);
  -moz-box-shadow: inset 0px -225px 300px -65px rgba(0,0,0,0.9);
  box-shadow: inset 0px -225px 300px -65px rgba(0,0,0,0.9);
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
class Home extends React.Component {
  
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
        <BannerImage src={banner.banner} alt={banner.name} height='600' coverCenter={banner.coverCenter}/>
      </Link>
    ))
  }

  render() {
    return (
          <div className="page page-home">
            <div className="page-header">
              <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover={false} interval={10000} showStatus={false}>
                {this.renderCarousel(NewsListModel)}
              </Carousel>
              <Row>
                {HomeNewsList.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
              </Row>
            </div>
          </div>
    )
  }
}

export default withLanguage(Home)