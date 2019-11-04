import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Nav from './components/Nav';
import { Provider } from 'react-redux'
import { store, history } from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render((
  <Provider store={store}>
    <Nav />
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'));
