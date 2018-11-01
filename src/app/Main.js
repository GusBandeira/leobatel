// Imports
import React from 'react'
import { Route } from 'react-router-dom'

// Import Context
import { MyContext } from 'context'

// Import pages
import asyncComponent from "./AsyncComponent";

// Import components
import Header from './components/Header'
const Home = asyncComponent(() => import('./pages/Home'));
const News = asyncComponent(() => import('./pages/News'));
const About = asyncComponent(() => import('./pages/About'));
const Portfolio = asyncComponent(() => import('./pages/Portfolio'));
const Contact = asyncComponent(() => import('./pages/Contact'));

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
      <Route path="/news/:id" component={News} />
      <Route path="/contact" component={Contact} />
    </React.Fragment>
  )
}

export default Main