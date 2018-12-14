import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import CSS
import 'app/styles/components/header.css'
import 'app/styles/components/links.css'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'

// Import Image
import LEOLogo from '../../images/LEOLogo.png'


const LanguageLink = styled.div`
  cursor: pointer;
  display: inline;
`
const HeaderBar = styled.div`
  height: 45px;
  width: 100%;
  background-color: black;
`
const LinkLogo = styled.div`
  width: 80%;
  padding: 5px;

  a {
    color: white;
    font-size: 28px;
    text-decoration: none;
  }
`
const Logo = styled.div`
  img{
    position: absolute;
    top: 10px;
    left: 280px;
  }
`
const MenuListItem = styled.li`
  a {
    margin: auto;
    span{
      margin-left: 10px;
    }
  }
`

class Header extends Component {
  render() {

    const { props: { language } } = this
    const text = translates[`translation${language}`]

    return (
      <header className="header">

        <HeaderBar className='md__show'> 
          <LinkLogo>
            <Link to='/'> 
              LEO BATEL
            </Link>
          </LinkLogo>
        </HeaderBar>
        <Container>
          <nav className="nav-wrapper">
            {<div className={`js-nav nav ${!this.props.context.state.isNavOpen && 'js-nav-hide'}`}>
              <Logo>
                <Link className='link' to="/" onClick={this.props.context.toggleNav}>
                  <img src={LEOLogo} alt="LEO Logo" width="100" height="100"/>
                </Link>
              </Logo>
              <ul className="nav-list">
                <MenuListItem>
                  <Link className='link' to="/about" onClick={this.props.context.toggleNav}> 
                    <FontAwesomeIcon icon={['fas', 'info-circle']} />
                    <span>{text.nav.about}</span>
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <Link className='link' to="/members" onClick={this.props.context.toggleNav}>
                    <FontAwesomeIcon icon={['fas', 'user-circle']} />
                    <span>{text.nav.members}</span>
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <Link className='link' to="/projects" onClick={this.props.context.toggleNav}>
                    <FontAwesomeIcon icon={['fas', 'cannabis']} />
                    <span>{text.nav.projects}</span>
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <Link className='link' to="/news" onClick={this.props.context.toggleNav}>
                    <FontAwesomeIcon icon={['fas', 'globe-americas']} />
                    <span>{text.nav.news}</span>
                  </Link>
                </MenuListItem>
                <MenuListItem>
                  <Link className='link' to="/contact" onClick={this.props.context.toggleNav}>
                    <FontAwesomeIcon icon={['fas', 'paw']} />
                    <span>{text.nav.join}</span>
                  </Link>
                </MenuListItem>
              </ul>
            </div>}
          </nav>
              {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}>
                <span />
                <span />
                <span />
              </button>}
        </Container>
              <div>
                  <LanguageLink
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="en"
                  >
                    EN
                  </LanguageLink>

                  <span className="nav-divider"></span>

                  <LanguageLink
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="pt"
                  >
                    PT
                  </LanguageLink>
              </div>
      </header>
    )
  }
}

export default withLanguage(Header)