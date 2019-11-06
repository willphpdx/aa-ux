import {fetchArticlePending, fetchArticleSuccess, fetchArticleError} from 'actions';

const BASE_URL = 'https://audaud.s3.amazonaws.com/articles/';

function fetchArticle() {
    return dispatch => {
        dispatch(fetchArticlePending());
        const url = new URL(`${BASE_URL}${slug}.html`)
        fetch(url.href)
        .then(res => res.html())
        .then(res => {
            // 1. Previous syntax turned the return into unreachable code.
            // 2. "res.error" and "res.err" are both values in this response or a typo?
            if (res.error) {
                throw res.err;
            }   
            dispatch(fetchArticleSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchArticleError(error));
        })
    }
}

export default fetchArticle;
