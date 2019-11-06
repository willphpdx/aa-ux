import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  ARTICLE_LOADED,
  ARTICLE_LOAD_FAILED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
      };
    case ARTICLE_LOADED:
      return {
        ...state,
        html: action.payload
      };
    case ARTICLE_LOAD_FAILED:
      return {
        ...state,
        err: action.payload
      };
    case ARTICLE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
