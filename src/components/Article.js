import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import marked from 'marked';

import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  ARTICLE_LOADED,
  ARTICLE_LOAD_FAILED,
 } from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.article,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED }),
  onArticleLoaded: payload =>
    dispatch({ type: ARTICLE_LOADED, payload}),
  onArticleLoadFailed: err =>
    dispatch({ type: ARTICLE_LOAD_FAILED, err })
});

class Article extends React.Component {
  componentDidMount() {
    const slug = this.props.match.params.id
    Promise.all([agent.Articles.getHtml(slug)])
    .then(res => this.props.onArticleLoaded(res[0].body))
    .catch(err => this.props.onArticleLoadFailed(err));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
