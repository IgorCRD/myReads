import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import NotificationsSystem, { reducer as notificationsReducer } from 'reapop';
import wyboTheme from 'reapop-theme-wybo';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// store
const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(combineReducers({
  notifications: notificationsReducer()
}), {});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <div>
        <NotificationsSystem theme={ wyboTheme }/>
          <App />
      </div>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
)
