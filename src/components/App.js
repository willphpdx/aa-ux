import React from 'react';
import Search from './Search';
import Article from './Article';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';

import { APP_LOAD, REDIRECT } from '../constants/actionTypes';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
    render() {
      return (
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/article/:slug" component={Article} />
        </Switch>
      )};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
