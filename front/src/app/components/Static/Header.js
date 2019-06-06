import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import CSS
import 'app/styles/components/header.css'
import 'app/styles/components/links.css'

// Import translations
import { translates } from '../../contexts/language/translations/translates'
import withLanguage from '../HOCs/withLanguage'

// Import Image
import LEOLogo from '../../../images/LEOLogo.png'

// Import Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../redux/authReducer/authActions'

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
const Logo = styled.div``

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

    state = {
        open: false
    }

    changeOpen() {
        this.setState({ open: !this.state.open })
    }
        
    render() {

        const { props, props: { language, user } } = this
        const text = translates[`translation${language}`]

        let name, email = null
        if(user){
            name = props.user.name
            email = props.user.email
        }


        return (
            <header className="header">
                <HeaderBar className='md__show'>
                    <Link to='/'>
                        <img src={LEOLogo} alt="LEO Logo" width="100" height="100" />
                    </Link>
                </HeaderBar>
                <Container>
                    <nav className="nav-wrapper">
                        {<div className={`js-nav nav ${!this.props.context.state.isNavOpen && 'js-nav-hide'}`}>
                            <Logo className="lg__show">
                                <Link className='link' to="/" onClick={this.props.context.toggleNav}>
                                    <img src={LEOLogo} alt="LEO Logo" width="100" height="100" />
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
                                    {props.user ? 
                                        <MenuListItem>
                                            <Link className='link' to="/contact" onClick={this.props.context.toggleNav} onMouseLeave={() => this.changeOpen()}>
                                                <FontAwesomeIcon icon={['fas', 'paw']} />
                                                <span>{name}<small>{email}</small></span>
                                            </Link>
                                            {this.state.open &&
                                                <a href="/#" onClick={() => { this.props.logout(); this.changeOpen() }}
                                                    className="btn btn-default btn-flat">Sair</a>
                                                }
                                        </MenuListItem>
                                        :
                                        <MenuListItem>
                                            <Link className='link' to="/contact" onClick={this.props.context.toggleNav}>
                                                <FontAwesomeIcon icon={['fas', 'paw']} />
                                                <span>{text.nav.join}</span>
                                            </Link>
                                        </MenuListItem>
                                    }
                                </ul>
                            </Menu>
                        </div>}
                    </nav>
                    {<button className={this.props.context.state.isNavOpen ? 'nav-toggler nav-toggler--open' : 'nav-toggler'} 
                                type="button" aria-label="Toggle navigation" onClick={this.props.context.toggleNav}>
                        <span />
                        <span />
                        <span />
                    </button>}
                </Container>
            </header>
        )
    }
}

const mapStateToProps = state => ({ user: state.authReducer.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLanguage(Header))