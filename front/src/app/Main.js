// Imports
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from '../app/components/Static/Footer'
import { Container } from 'reactstrap'

// Import Context
import { MyLanguageContext } from './contexts/language/languageContext'

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
const Login = AsyncComponent(() => import('./pages/Login'));
const CreateAccount = AsyncComponent(() => import('./pages/CreateAccount')); 
const Profile = AsyncComponent(() => import('./pages/Profile')); 

// Component Implementation
const Main = () => {
  return (
    <React.Fragment>
      <MyLanguageContext.Consumer >
        {context => <Header context={context}/>}
      </MyLanguageContext.Consumer>

      <Container className="content">
        <Route exact path="/" component={Home} />
        <Route path="/members" component={Members} />
        <Route exact path="/news" component={NewsPageList} />
        <Route path="/news/:id" component={News} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/LEO" component={LEO} />

        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/insert-content" component={InsertContent} />
        <Route path="/my-profile" component={Profile} />
      </Container>

      <Footer />
    </React.Fragment>
  )
}

export default Main