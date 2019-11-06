import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, global.Promise);
const encode = encodeURIComponent;
const responseBody = res => res.body;

const SEARCH_ROOT = 'https://tjjxmcchgd.execute-api.us-east-1.amazonaws.com/Prod'
const ASSETS_ROOT = 'https://audaud.s3.amazonaws.com'

const requests = {
  search: uri =>
    superagent.get(`${SEARCH_ROOT}${uri}`).then(responseBody),
  getImage: slug =>
    superagent.get(`${ASSETS_ROOT}/images/${slug}.jpg`),
  getHtml: slug =>
    superagent.get(`${ASSETS_ROOT}/articles/${slug}.html`),
};

const Articles = {
  getImage: slug =>
    requests.getImage(slug),
  getHtml: slug =>
    requests.getHtml(slug),
};

const Searches = {
  all: page =>
    requests.search(`/search/articles/v1`),
  byAuthor: (author) =>
    requests.search(`/search/articles/v1?author=${encode(author)}`),
  get: slug =>
    requests.search(`/search/articles/v1?slug=${encode(slug)}`),
};

export default {
  Articles,
  Searches
};
