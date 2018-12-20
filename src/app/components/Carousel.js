import React, { Component } from 'react'
import { Carousel as CarouselComponent} from 'react-responsive-carousel'
import { Link } from 'react-router-dom'

// Import Components
import { BannerImage, BannerShadow, BannerTitle, CarousselContainer } from '../components/Banner'

export class Carousel extends Component {

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
