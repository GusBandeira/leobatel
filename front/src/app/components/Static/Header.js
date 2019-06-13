import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import onClickOutside from 'react-onclickoutside'

// Import components
import { BASE_URL } from '../../utils/constants'
import { AuthorImage } from '../Page/Page'

// Import CSS
import 'app/styles/components/header.css'
import 'app/styles/components/links.css'

// Import translations
import { translates } from '../../contexts/language/translations/translates'
import withLanguage from '../HOCs/withLanguage'
import { withRouter } from 'react-router-dom'

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
const OptionsDrop = styled.div`
    opacity: ${props => props.open ? 1 : 0};
    margin-top: ${props => props.open ? '0px' : '-15px'};
    float: right;
    transition: all .3s ease-in-out;
    background-color: white;
    box-shadow: 0 0 3px #ccc;
    padding:  ${props => props.open ? '10px' : '0'};
    width: 220px;

    height: ${props => props.open ? 'auto' : '0'};
    display: ${props => props.open ? 'block' : 'none'};

    div:last-child {
        border-bottomn: none;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`
const OptionsRow = styled.div`
    padding: 10px 15px;
    border-bottomn: 1px solid lightgray;
    display: flex;
    flex-wrap: wrap;
    

    :hover{
        background-color: hsl(150, 40%, 30%);
        color: white;
        cursor: pointer;
    }
`
const LoggedContainer = styled.div`
    margin: auto;
    font-size: 16px;
    color: hsla(0, 100%, 100%, 1);
    display: inline-flex;
    cursor: pointer;
`
const IconContainer = styled.div`
    margin-left: 10px;

    transform: rotate(${props => props.open ? '180deg' : '0deg'});
    -ms-transform: rotate(${props => props.open ? '180deg' : '0deg'});
    -webkit-transform: rotate(${props => props.open ? '180deg' : '0deg'});

    -webkit-transition: -webkit-transform .4s ease-in-out;
    -ms-transition: -ms-transform .4s ease-in-out;
    transition: transform .4s ease-in-out;  
`

class Header extends Component {

    state = {
        open: false
    }

    changeOpen() {
        this.setState({ open: !this.state.open })
    }
    changeOpenBool(bool) {
        this.setState({ open: bool })
    }

    onClickOption = (link) => {
        const { props } = this
        props.history.push(link)
        this.changeOpen()
    }

    handleClickOutside = () => {
        const { state } = this
        if(state.open){
            this.changeOpenBool(false)
        }
    }

    render() {

        const { props, props: { language, user }, state } = this
        const text = translates[`translation${language}`]

        let name, photo
        if (user) {
            name = props.user.name
            photo = props.user.photo || 'uploads/LEOLogo.png'
        }


        return (
            <div>
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
                                            <React.Fragment>
                                                <MenuListItem>
                                                    <AuthorImage src={`${BASE_URL}${photo.replace('\\', '/')}`} alt={'leo'} />
                                                    <LoggedContainer onClick={() => this.changeOpen()}>
                                                        {name.substring(0, name.indexOf(' '))}
                                                        <IconContainer open={state.open}>
                                                            <FontAwesomeIcon icon={['fas', 'chevron-down']}/>
                                                        </IconContainer>
                                                    </LoggedContainer>
                                                </MenuListItem>
                                            </React.Fragment>
                                            :
                                            <MenuListItem>
                                                <Link className='link' to="/contact" onClick={this.props.context.toggleNav}>
                                                    <FontAwesomeIcon icon={['fas', 'paw']} />
                                                    <span>{text.nav.join}</span>
                                                </Link>
                                            </MenuListItem>
                                        }
                                    </ul>
                                    <OptionsDrop open={state.open}>
                                        <OptionsRow onClick={() => this.onClickOption("/insert-content")}>
                                            Inserir Conteúdo
                                        </OptionsRow>
                                        <OptionsRow onClick={() => this.onClickOption("/create-account")}>
                                            Cadastrar Usuário
                                        </OptionsRow>
                                        <OptionsRow  onClick={() => this.onClickOption("/my-profile")}>
                                            Meu perfil
                                        </OptionsRow>
                                        <OptionsRow  onClick={() => this.onClickOption("/messages")}>
                                            Mensagens
                                        </OptionsRow>
                                        <OptionsRow  onClick={() => { props.logout(); this.onClickOption("/")}}>
                                            Sair
                                        </OptionsRow>
                                    </OptionsDrop>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.authReducer.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withLanguage(onClickOutside(Header))))