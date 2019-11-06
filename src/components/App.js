import React from 'react';
import Search from './Search';
import Article from './Article';
import { Route, Switch } from 'react-router-dom'

export default class App extends React.Component {
    render() {
      return (
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/article/:slug" component={Article} />
        </Switch>
      )};
}
