import React from 'react'
import  { Link } from 'react-router-dom'

// Import translations
import { translates } from 'translations/translates'
import withLanguage from '../withLanguage'

// Components
import { Carousel } from 'react-responsive-carousel'

// Data
import { NewsListModel } from '../Models/NewsListModel'

class Home extends React.Component {
  
  renderCarousel(list) {
    list.map(banner => (
      <div>
        <Link to={banner.link}>
          <img src={banner.phoot} alt={banner.name} />
        </Link>
      </div>
    ))
  }

  render() {

    const { props: { language } } = this
    const text = translates[`translation${language.toUpperCase()}`]

    return (
          <div className="page page-home">
            {
              (() => {
                return <div className="page-header">
                  <h1 className="page-heading-h1">
                    {text.home.h1}
                  </h1>
                  <h2 className="page-heading-h2">
                    {text.home.h2}
                  </h2>
                  <Carousel>
                    {this.renderCarousel(NewsListModel)}
                  </Carousel>
                </div>
              })()
            }
          </div>
    )
  }
}

export default withLanguage(Home)