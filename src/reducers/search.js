import { produce } from 'immer';
import {
  SEARCH_COMPLETE,
  SEARCH_ERROR,
  AUTHOR_SELECTED,
  AUTHOR_LOAD_FAILED,
  ARTICLE_SELECTED,
  ARTICLE_LOAD_FAILED,
} from '../constants/actionTypes';

/**
 * It is convention to create an "initialState" 
 * to initiate the basic shape of the state of each reducer. 
 * 
 * This helps the code self-document and developers extend functionality 
 * with a clearer understanding of the data that moves through the reducer.
 * Ideally a reducer handles a stable state shape.
 */
const initialState = {
  article: null,
  author: null,
  slug: null,
};

/**
 * Immer/Produce is an award winning Javascript library that improves code predictability.
 * 
 * introduction: https://immerjs.github.io/immer/docs/introduction
 * example: https://immerjs.github.io/immer/docs/example-reducer
 * 
 * Specifically it helps to manage "value vs reference" issues when mutating nested state values.
 * 
 * This means that with immer, if you have a nested state object, you can mutate values with "dot notation", 
 * instead of having to spread inside each object as you reach the nested section of state that you intend to mutate.
 * 
 * // this is how you make changes inside the reducer case without immer:
 * case MY_CASE:
 *   return {
 *     some: {
 *      ...state.some,
 *      nested: {
 *        ...state.some.nested,
 *        value: "myNewValue",
 *      },
 *    },
 *   };
 * 
 * 
 * // this is how you can make that same change when using immer:
 * case MY_CASE:
 *   draft.some.nested.value = "myNewValue";
 *   break;
 * 
 * 
 * It looks a bit magical, but it saves you a lot of debugging time when dealing with complex state objects.
 */
export default (state = initialState, action = { type: null }) => 
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_COMPLETE:
        draft.articles = action.payload;
        break;
      case SEARCH_ERROR:
        draft = { ...initialState };
        break;
      case AUTHOR_SELECTED:
        draft.author = action.payload;
        break;
      case AUTHOR_LOAD_FAILED:
        draft = { ...initialState };
        break;
      case ARTICLE_SELECTED:
        draft.slug = action.payload;
        break;
      case ARTICLE_LOAD_FAILED:
        draft = { ...initialState };
        break;
      // no default
    }
  });