import React, { Component } from 'react'


// Import Components
import { CoverImage } from '../components/ImageFrame'
import NewsComponent from '../components/NewsComponent'

// Import Image
import friends from '../../images/friends.jpg'
import family from '../../images/family.jpg'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'


export class About extends Component {
    
    state = {
        about: []
    }
    
    componentDidMount(){
        const language = this.props.language
        const text = translates[`translation${language}`]
        this.setState({
            about: [
                {
                    type: 't',
                    content: text.about.title
                },
                {
                    type: 's',
                    content: 'Família Souza visita lar carente da grande Curitiba e tem dia de glória',
                },
                {
                    type: "p",
                    content: "Lorem ipsum nam eget ultricies viverra odio ullamcorper hac platea eu elementum, vitae curae ante netus sodales dui etiam vehicula nulla interdum sagittis, tortor curabitur habitant odio aptent quam imperdiet posuere turpis consequat. inceptos cras gravida elementum dapibus sollicitudin libero ultricies hendrerit, curabitur etiam potenti dapibus curabitur imperdiet nec quisque fusce, donec nam ut donec imperdiet eu blandit. felis metus commodo eget nostra aliquam diam turpis ullamcorper aliquet, etiam torquent curae lobortis donec magna vitae neque lorem himenaeos, habitant elementum feugiat egestas cras congue fusce taciti. phasellus mattis hac odio eleifend neque luctus est adipiscing, lobortis hac himenaeos eros netus aenean arcu facilisis, metus ut pharetra quisque aenean libero class." 
                },
                {
                    type: "i",
                    photo: family,
                    name: 'Foto da família',
                    subtitle: 'Foto da família Souza, em 2018'
                },
                {
                    type: "p",
                    content: "Blandit euismod condimentum quisque sem egestas dictum quis purus, morbi sit odio enim eget donec mauris suspendisse, sed accumsan lorem vitae elit porta accumsan. eget taciti rutrum ac curabitur at leo platea iaculis aenean aliquam, mauris eros congue non lobortis dictum dictumst nibh urna. tristique ut bibendum facilisis quis himenaeos faucibus dapibus torquent nisl tellus aliquam, orci tortor praesent dictumst lectus quisque imperdiet fringilla erat enim donec sodales, at sapien mollis lorem aptent rhoncus vestibulum libero cras vestibulum. viverra facilisis rhoncus eu aliquam proin adipiscing aenean augue ut porttitor, ut id aliquam fusce pretium sociosqu lacinia imperdiet." 
                },
                {
                    type: "p",
                    content: "Blandit euismod condimentum quisque sem egestas dictum quis purus, morbi sit odio enim eget donec mauris suspendisse, sed accumsan lorem vitae elit porta accumsan. eget taciti rutrum ac curabitur at leo platea iaculis aenean aliquam, mauris eros congue non lobortis dictum dictumst nibh urna. tristique ut bibendum facilisis quis himenaeos faucibus dapibus torquent nisl tellus aliquam, orci tortor praesent dictumst lectus quisque imperdiet fringilla erat enim donec sodales, at sapien mollis lorem aptent rhoncus vestibulum libero cras vestibulum. viverra facilisis rhoncus eu aliquam proin adipiscing aenean augue ut porttitor, ut id aliquam fusce pretium sociosqu lacinia imperdiet." 
                },
                {
                    type: "q",
                    content: "Cursus inceptos pulvinar suscipit imperdiet leo ante luctus mi cursus class, egestas donec vestibulum mi a dapibus ullamcorper odio ultricies, fames bibendum sagittis quisque euismod hac magna porttitor cras. semper purus eleifend arcu habitant fusce posuere scelerisque bibendum amet nunc arcu, sollicitudin curabitur mauris interdum placerat augue etiam proin nibh semper proin, odio pulvinar imperdiet curae accumsan eu vulputate tortor ut metus. malesuada urna netus augue interdum nulla blandit ut curae adipiscing in quam urna, maecenas libero adipiscing donec hac aenean quis congue dolor mauris nostra mi, porta sociosqu per libero tellus tempor dictum cubilia hendrerit aenean donec.",
                    sign: "Someone over the rainbow"
                },
                {
                    type: "p",
                    content: "Vel purus sapien eros iaculis vel duis purus ligula senectus, lectus nulla inceptos sodales porttitor sodales congue potenti torquent integer, et maecenas curabitur blandit sapien eleifend integer euismod. fringilla hac morbi platea feugiat ullamcorper luctus vitae potenti, nunc feugiat curabitur morbi ante tempus libero, ornare malesuada ligula netus nisl porttitor at. amet maecenas turpis eleifend cras iaculis mattis donec in, integer eu etiam aliquam fringilla urna tortor, litora odio nunc ultrices taciti dolor aliquet. massa vehicula at ipsum potenti nam justo, auctor placerat congue pharetra convallis, vel lorem ac neque urna." 
                }
            ],
        })
    }

  render() {
      const { state } = this
    return (
        <div className='page'>
          <CoverImage>
            <img src={friends} alt='About' />
          </CoverImage>
          <NewsComponent news={state.about} />
        </div>
      )
    }
}

export default withLanguage(About)
