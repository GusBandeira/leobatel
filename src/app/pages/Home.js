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
  height: 800px;
  width: 100vw;
`

class Home extends React.Component {
  
  renderCarousel(list) {
    console.log(list)
    return list.map(banner => (
      <Link to={banner.link}>
        <BannerImage src={banner.banner} alt={banner.name} height='800'/>
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
            </div>
          </div>
    )
  }
}

export default withLanguage(Home)