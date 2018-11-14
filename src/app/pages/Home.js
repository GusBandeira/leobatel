import React from 'react'
import  { Link } from 'react-router-dom'
import styled from 'styled-components'

// Import translations
import { translates } from 'translations/translates'
import withLanguage from '../withLanguage'

// Components
import { Carousel } from 'react-responsive-carousel'

// Data
import { NewsListModel } from '../Models/NewsListModel'

class Home extends React.Component {
  
  renderCarousel(list) {
    return list.map(banner => (
      <Link to={banner.link}>
        <img src={banner.banner} alt={banner.name} height='800'/>
      </Link>
    ))
  }

  render() {

    const { props: { language } } = this
    const text = translates[`translation${language.toUpperCase()}`]

    return (
          <div className="page page-home">
            <div className="page-header">
              <h1 className="page-heading-h1">
                {text.home.h1}
              </h1>
              <h2 className="page-heading-h2">
                {text.home.h2}
              </h2>
              <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover={false} interval={10000}>
                {this.renderCarousel(NewsListModel)}
              </Carousel>
            </div>
          </div>
    )
  }
}

export default withLanguage(Home)