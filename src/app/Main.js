// Imports
import React from 'react'
import { Route } from 'react-router-dom'

// Import Context
import { MyContext } from 'context'

// Import pages
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import About from './pages/About'

// Import components
import Header from './components/Header'

// Component Implementation
const Main = () => {
  return (
    <React.Fragment>
      <MyContext.Consumer >
        {context => <Header context={context}/>}
      </MyContext.Consumer>

      <Route exact={true} path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/about" component={About} />
    </React.Fragment>
  )
}

export default Main