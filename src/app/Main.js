// Imports
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from '../app/components/Footer'
import { Container } from 'reactstrap'

// Import Context
import { MyContext } from 'context'

// Import pages
import asyncComponent from "./AsyncComponent";


// Import Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Import components
import Header from './components/Header'

// Starters 

library.add(fab, fas)

const Home = asyncComponent(() => import('./pages/Home'));
const News = asyncComponent(() => import('./pages/News'));
const NewsPageList = asyncComponent(() => import('./pages/NewsPageList'));
const Members = asyncComponent(() => import('./pages/Members'));
const Contact = asyncComponent(() => import('./pages/Contact'));
const Projects = asyncComponent(() => import('./pages/Projects'));
const About = asyncComponent(() => import('./pages/About'));
const LEO = asyncComponent(() => import('./pages/LEO'));

// Component Implementation
const Main = () => {
  return (
    <React.Fragment>
      <MyContext.Consumer >
        {context => <Header context={context}/>}
      </MyContext.Consumer>

      <Container className="content">
        <Route exact={true} path="/" component={Home} />
        <Route path="/members" component={Members} />
        <Route exact path="/news" component={NewsPageList} />
        <Route path="/news/:id" component={News} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/LEO" component={LEO} />
      </Container>

      <Footer />
    </React.Fragment>
  )
}

export default Main