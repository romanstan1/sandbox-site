import React from 'react';
import { render } from 'react-dom'

import './styles/index.css';
import App from './App';
import { ConnectedRouter } from 'react-router-redux'
import store from './store'
import {Provider} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import $ from 'jquery'

const history = createBrowserHistory()


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));


  // "people": [
  //   {"id": "109023455", type:"person", "name": "David Buckshaw", "location": "London", "skills":['11', '13', '14', '20'], "desired_skills":['12', '13'] },
  //   {"id": "129033477", type:"person", "name": "Dominic Hoole", "location": "Chichester", "skills":['11', '15', '16'], "desired_skills":['19'] },
  //   {"id": "199053402", type:"person", "name": "Miles Preston", "location": "London", "skills":['12', '13', '14'], "desired_skills":['12', '13'] },
  //   {"id": "189033422", type:"person", "name": "Edward Magloire", "location": "Mauritius", "skills":['12', '13', '15'], "desired_skills":['14', '13'] },
  //   {"id": "179053428", type:"person", "name": "Frank Countessdelo", "location": "Chichester", "skills":['12', '13', '17'], "desired_skills":['14', '19'] },
  //   {"id": "169024542", type:"person", "name": "Evan Geborand", "location": "London", "skills":['16', '17', '18'], "desired_skills":['14', '19'] },
  //   {"id": "159026602", type:"person", "name": "Robert Champtercier", "location": "Sydney", "skills":['16', '17', '18'], "desired_skills":['14', '19'] },
  //   {"id": "929023402", type:"person", "name": "Dylan Cravatte", "location": "Sydney", "skills":['14', '17', '18'], "desired_skills":['11', '12'] },
  //   {"id": "829223602", type:"person", "name": "Count Olaf", "location": "London", "skills":['15', '16', '17', '18', '19'], "desired_skills":['12', '18'] },
  // ]
  //
  // "skills": [
  //   {"id": "11",  type:"skill", "name": "Python" },
  //   {"id": "12",  type:"skill", "name": "AngularJS" },
  //   {"id": "13",  type:"skill", "name": "Angular2" },
  //   {"id": "14",  type:"skill", "name": "React" },
  //   {"id": "15",  type:"skill", "name": "Drupal 7" },
  //   {"id": "16",  type:"skill", "name": "Pottery" },
  //   {"id": "17",  type:"skill", "name": "Line Dancing" },
  //   {"id": "18",  type:"skill", "name": "UX Design" },
  //   {"id": "19",  type:"skill", "name": "Rugby" },
  //   {"id": "20",  type:"skill", "name": "Digital Marketing" }
  // ]
