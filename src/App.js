import React, {Component} from 'react';
import {Route,Router,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './Pages/Home/Home'
// import Terrain from './components/Terrain/Terrain'
// import Home from './components'
// import ThreeDSnake from './components/ThreeDSnake/ThreeDSnake'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route exact path="/" component={Home}/>
          <Route exact path="/terrain" component={Terrain}/>
          <Route exact path="/ThreeDSnake" component={ThreeDSnake}/> */}
          <Route component={Home}/>
        </Switch>
      </Router>)
  }
}
export default App