import './index.css'
import routes from './route';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {this.showRoute(routes)}
        </Switch>
      </Router>
    );
  }
  showRoute(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
          >{route.main}</Route>
        )
      });
    }
    return result;
  }
}

export default App;

