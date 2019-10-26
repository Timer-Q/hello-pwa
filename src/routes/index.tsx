import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../containers/home';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/' render={() => <Redirect to='/home' />} />
      </Switch>
    </Router>
  );
}
