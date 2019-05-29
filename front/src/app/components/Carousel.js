import React, { Component } from 'react'
import { Carousel as CarouselComponent} from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'

// Import Components
import { BannerImage, BannerShadow, BannerTitle, CarousselContainer } from '../components/Banner'

export class Carousel extends Component {

    renderCarousel(list) {
        return list.map((banner, index) => (
            <Link to={'news/' + banner._id} key={index}>
                <BannerShadow/>
                    <BannerTitle className='row'>
                        <span>
                            {banner.title}
                        </span>
                        <span>
                            {banner.subtitle}
                        </span>
                    </BannerTitle>
                <BannerImage src={`${BASE_URL}${banner.photo[0].replace('\\', '/')}`} alt={banner.title} height='600' cover={banner.cover}/>
            </Link>
        ))
    }

  render() {

    const { props: { list } } = this;

    return (
        <CarousselContainer>
            <CarouselComponent showThumbs={false} infiniteLoop autoPlay stopOnHover={false} interval={10000} showStatus={false}>
                {this.renderCarousel(list)}
            </CarouselComponent>
        </CarousselContainer>
    )
  }
}

export default Carousel
