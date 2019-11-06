import React from 'react';
import { Container } from '@material-ui/core';
import agent from '../agent';
import { connect } from 'react-redux';
import marked from 'marked';

import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../constants/actionTypes';

const parse = require('html-react-parser');

const mapStateToProps = state => ({
  ...state.article,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends React.Component {
  /**
   * `componentWillMount` is a depricated method.
   * strongly recommend you use `componentDidMount`
   * 
   * https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
   */
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
    ]));
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
