import produce from 'immer';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from '../constants/actionTypes';

// Strongly recommend fleshing out the basic shape of this object for self-documenting code.
const initialState = {};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ARTICLE_PAGE_LOADED:
        draft = state;
        break;
      case ARTICLE_PAGE_UNLOADED:
        draft = { ...initialState };
        break;
      // no default
    }
  });
