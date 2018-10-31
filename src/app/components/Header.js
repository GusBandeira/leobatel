import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import CSS
import 'app/styles/components/header.css'
import 'app/styles/components/links.css'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'

class Header extends Component {
  render() {

    const { props: { language } } = this
    const text = translates[`translation${language}`]

    return (
      <header className="header">
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

                <li className="nav-languages">
                  <a
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="en"
                  >
                    EN
                  </a>

                  <span className="nav-divider"></span>

                  <a
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="cz"
                  >
                    CZ
                  </a>

                  <span className="nav-divider"></span>

                  <a
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="de"
                  >
                    DE
                  </a>

                  <span className="nav-divider"></span>

                  <a
                    className="link"
                    onClick={this.props.context.changeLanguage}
                    data-language="fr"
                  >
                    FR
                  </a>
                </li>
              </ul>
            </div>}

            <div className='nav-responsive'>
              {/* {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}> */}
              {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}>
                <span />
                <span />
                <span />
              </button>}
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default withLanguage(Header)