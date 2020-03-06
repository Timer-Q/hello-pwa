import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../containers/home';
import Detail from '../containers/detail';
import Mi from '../containers/mi';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/detail' component={Detail} />
        <Route path='/home' component={Home} />
        <Route path='/mi' component={Mi} />
        <Route path='/' render={() => <Redirect to='/mi' />} />
      </Switch>
    </Router>
  );
}
