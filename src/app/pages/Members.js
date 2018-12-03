import React, { Component } from 'react'
import AOS from 'aos'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'

//Import Components
import { Image, CoverImage } from '../components/ImageFrame'

// Import images
import sir from '../../images/sir.jpg'
import dude from '../../images/dude.jpg'
import girl from '../../images/girl.jpg'
import napa from '../../images/napa.jpg'
import silvio from '../../images/silvio.jpg'
import belchior from '../../images/belchior.jpg'
import group from '../../images/Group.png'

class Members extends Component {

  componentDidMount(){
    AOS.init();
  }

  state = {
    photos: [ 
      {
        name: 'Sir',
        description: 'Senhor dos anos 50',
        photo: sir,
      },
      {
        name: 'Dude',
        description: 'Eae rapá',
        photo: dude,
      },
      {
        name: 'Jude',
        description: 'o.o',
        photo: girl,
      },
      {
        name: 'Napa',
        description: 'Luciana Huck',
        photo: napa,
      },
      {
        name: 'Silivo',
        description: 'Ma oe, quem quer dinheiro?',
        photo: silvio,
      },
      {
        name: 'Belchior',
        description: 'Apenas um rapaz latino americano',
        photo: belchior,
      }
    ]
  }

  render() {

    const { state, props: { language } } = this
    const text = translates[`translation${language}`]

    return (
      <div className="page page-portfolio page-static">
          <CoverImage>
            <img src={group} alt={'Imagem do grupo'}/>
          </CoverImage>
          <div>
            <h1 className="page-heading-h2">{text.members.h1}</h1>
            <h2 className="page-text">{text.members.h2}</h2>
          </div>
          <div className="row">
            {state.photos.map((photo, index) => <Image photo={photo} key={index}/>)}
          </div>
      </div>
    )
  }
}

export default withLanguage(Members)