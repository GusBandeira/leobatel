import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Import service workers
import * as serviceWorker from 'serviceWorker'

// Import context provider
import { MyLanguageProvider } from './app/contexts/language/languageContext'

// Import Main component
import Main from './app/Main'

// Import CSS
import 'app/styles/base.scss'
import 'app/styles/layout.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-block-ui/style.css';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux'
import rootReducer from './app/redux/rootReducers'

const reduxStore = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


// Create App component
const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <MyLanguageProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MyLanguageProvider>
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()