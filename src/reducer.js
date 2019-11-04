import article from './reducers/article';
import search from './reducers/search';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  search,
  router: routerReducer
});
