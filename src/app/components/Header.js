import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Import CSS
import 'app/styles/components/header.css'
import 'app/styles/components/links.css'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'


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
        <div>
          <nav className="nav-wrapper">
            {<div className={`js-nav nav ${!this.props.context.state.isNavOpen && 'js-nav-hide'}`}>
              <ul className="nav-list">
                <li>
                  <Link className='link' to="/" onClick={this.props.context.toggleNav}>
                    {text.nav.home}
                  </Link>
                </li>

                <li>
                  <Link className='link' to="/portfolio" onClick={this.props.context.toggleNav}> 
                    {text.nav.portfolio}
                  </Link>
                </li>

                <li>
                  <Link className='link' to="/about" onClick={this.props.context.toggleNav}>
                    {text.nav.about}
                  </Link>
                </li>

                <li>
                  <Link className='link' to="/contact" onClick={this.props.context.toggleNav}>
                    {text.nav.contact}
                  </Link>
                </li>

                <li className="nav-languages">
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
                    data-language="cz"
                  >
                    CZ
                  </LanguageLink>

                  <span className="nav-divider"></span>

                  <LanguageLink
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="de"
                  >
                    DE
                  </LanguageLink>

                  <span className="nav-divider"></span>

                  <LanguageLink
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="fr"
                  >
                    FR
                  </LanguageLink>
                </li>
              </ul>
            </div>}

          </nav>
              {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}>
                <span />
                <span />
                <span />
              </button>}
        </div>
      </header>
    )
  }
}

export default withLanguage(Header)