import {
  SEARCH_COMPLETE,
  SEARCH_ERROR,
  AUTHOR_SELECTED,
  AUTHOR_LOAD_FAILED,
  ARTICLE_SELECTED,
  ARTICLE_LOAD_FAILED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_COMPLETE:
      return {
        ...state,
        articles: action.payload
      };
    case SEARCH_ERROR:
      return {};
    case AUTHOR_SELECTED:
      return {
        ...state,
        author: action.payload
      };
    case AUTHOR_LOAD_FAILED:
      return {};
    case ARTICLE_SELECTED:
      return {
        ...state,
        slug: action.payload
      };
    case ARTICLE_LOAD_FAILED:
      return {};
    default:
      return state;
  }
};
