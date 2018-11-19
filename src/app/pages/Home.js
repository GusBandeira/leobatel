import React from 'react'
import  { Link } from 'react-router-dom'
import  styled from 'styled-components'

// Import translations
import withLanguage from '../withLanguage'

// Components
import { Carousel } from 'react-responsive-carousel'

// Data
import { NewsListModel } from '../Models/NewsListModel'

const BannerImage = styled.img`
  object-fit: cover;
  height: 600px;
  width: 100vw;
`
const BannerShadow = styled.div`
-webkit-box-shadow: inset 0px -300px 300px -115px rgba(0,0,0,0.9);
-moz-box-shadow: inset 0px -300px 300px -115px rgba(0,0,0,0.9);
box-shadow: inset 0px -300px 300px -115px rgba(0,0,0,0.9);
`
const BannerTitle = styled.div`
  height: 300px !important;
  position: absolute;
  top: 50% !important;
  color: white;
  padding-top: 100px;
  display: inline-grid;

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
`
class Home extends React.Component {
  
  renderCarousel(list) {
    return list.map(banner => (
      <Link to={banner.link}>
        <BannerShadow>
          <BannerTitle>
            <span>
              {banner.name}
            </span>
            <span>
              {banner.subtitle}
            </span>
          </BannerTitle>
        </BannerShadow>
        <BannerImage src={banner.banner} alt={banner.name} height='600'/>
      </Link>
    ))
  }

  render() {
    return (
          <div className="page page-home">
            <div className="page-header">
              <div></div>
              <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover={false} interval={10000} showStatus={false}>
                {this.renderCarousel(NewsListModel)}
              </Carousel>
            </div>
          </div>
    )
  }
}

export default withLanguage(Home)