import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ChatView } from '../pages/ChatView';
export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/chat" component={ChatView} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
