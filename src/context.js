import React, { Component } from 'react'
import Cookie from 'universal-cookie'

// Create new context
export const MyContext = React.createContext()

// Then create a Provider Component
export class MyProvider extends Component {
  state = {
    isNavOpen: false,
    language: ''
  }

  changeLanguage = (e) => {
    const cookie = new Cookie()
    cookie.set('language', e.target.dataset.language.toUpperCase())
    this.setState({
      isNavOpen: !this.state.isNavOpen,
      language: e.target.dataset.language
    })
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    })
  }

  render() {
    return (
      <MyContext.Provider value={{
        language: this.state.language,
        state: this.state,
        changeLanguage: this.changeLanguage,
        toggleNav: this.toggleNav
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}