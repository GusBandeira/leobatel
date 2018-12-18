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


// const LanguageLink = styled.div`
//   cursor: pointer;
//   display: inline;
// `
const HeaderBar = styled.div`
  height: 45px;
  background-color: green;
  width: 100%;
  text-align: center;
  position: absolute;
`
const LinkLogo = styled.div`

`
const Logo = styled.div`

`
const Menu = styled.div`
  width: 90%;
  text-align: right;


  @media screen and (max-width: 1200px) {
    width: 85%;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
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
          <Link to='/'> 
            <img src={LEOLogo} alt="LEO Logo" width="100" height="100"/>
          </Link>
        </HeaderBar>
        <Container>
          <nav className="nav-wrapper">
            {<div className={`js-nav nav ${!this.props.context.state.isNavOpen && 'js-nav-hide'}`}>
              <Logo className="lg__show">
                <Link className='link' to="/" onClick={this.props.context.toggleNav}>
                  <img src={LEOLogo} alt="LEO Logo" width="100" height="100"/>
                </Link>
              </Logo>
              <Menu>
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
              </Menu>
            </div>}
          </nav>
              {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}>
                <span />
                <span />
                <span />
              </button>}
        </Container>
              {/* <div>
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
              </div> */}
      </header>
    )
  }
}

export default withLanguage(Header)