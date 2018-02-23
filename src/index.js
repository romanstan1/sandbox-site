import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom'

import './styles/index.css';
import App from './App';
import { ConnectedRouter } from 'react-router-redux'
import store from './store'
import {Provider} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import $ from 'jquery'

const history = createBrowserHistory()



// ReactDOM.render(<App />, document.getElementById('root'));
//
// $(document).ready(function () {
//     ReactDOM.render(<App />, document.getElementById('root'));
// });



render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
