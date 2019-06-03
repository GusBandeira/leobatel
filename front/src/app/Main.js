// Imports
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from '../app/components/Static/Footer'
import { Container } from 'reactstrap'

// Import Context
import { MyContext } from './contexts/language/languageContext'

// Import pages
import AsyncComponent from "./utils/AsyncComponent";


// Import Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Import components
import Header from './components/Static/Header'

// Starters 

library.add(fab, fas)

const Home = AsyncComponent(() => import('./pages/Home'));
const News = AsyncComponent(() => import('./pages/News'));
const NewsPageList = AsyncComponent(() => import('./pages/NewsPageList'));
const Members = AsyncComponent(() => import('./pages/Members'));
const Contact = AsyncComponent(() => import('./pages/Contact'));
const Projects = AsyncComponent(() => import('./pages/Projects'));
const About = AsyncComponent(() => import('./pages/About'));
const LEO = AsyncComponent(() => import('./pages/LEO'));
const InsertContent = AsyncComponent(() => import('./pages/InsertContent'));

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

        <Route path="/insert-content" component={InsertContent} />
      </Container>

      <Footer />
    </React.Fragment>
  )
}

export default Main