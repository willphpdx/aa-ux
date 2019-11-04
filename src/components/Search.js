import React from 'react';

import { Container } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridListTileBar } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Selector from './Selector';
import { Redirect } from "react-router-dom";
import agent from '../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import replacer from '../commons'

import {
  SEARCH_PAGE_LOADED,
  SEARCH_PAGE_UNLOADED,
  SEARCH_COMPLETE,
  SEARCH_ERROR,
  AUTHOR_SELECTED,
  AUTHOR_LOAD_FAILED,
  ARTICLE_SELECTED,
  ARTICLE_LOAD_FAILED,
 } from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state,
  articles: state.search.articles,
  author: state.search.author
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: SEARCH_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: SEARCH_PAGE_UNLOADED }),
  onSearchComplete: (articles) =>
    dispatch({type: SEARCH_COMPLETE, payload: articles}),
  onAuthorSelected: (author) =>
    dispatch({type: AUTHOR_SELECTED, payload: author}),
  onSearchFailed: (err) =>
    dispatch({type: SEARCH_ERROR, payload: err}),
  onArticleSelected: (slug) =>
    dispatch({type: ARTICLE_SELECTED, payload: slug}),
  onArticleLoadFailed: (err) =>
    dispatch({type: ARTICLE_LOAD_FAILED, payload: err}),

});

class Search extends React.Component {
  componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  constructor() {
      super();
      this.state = {
          author: '',
          articles: []
      }
      this.navigate = this.navigate.bind(this);
  }

  navigate = event => {
    const slug = event.target.id;
    console.log("slig: ", slug)
    this.props.onArticleSelected(slug)
    Promise.all([agent.Articles.get(slug)])
    .then(res => this.props.onArticleLoaded(res[0].body))
    .catch(err => this.props.onArticleLoadFailed(err));
  }

  selectAuthor = event => {
    this.props.onAuthorSelected(event.target.value)
    Promise.all([agent.Searches.byAuthor(event.target.value)])
    .then(res => this.props.onSearchComplete(res[0].Items))
    .catch(err => this.props.onSearchFailed(err));
  }

  render() {
    return (
      <Container>
        <Selector data = {
          {
            size: 6,
            label: 'Author',
            populateType: 'author',
            populateWith: ['Gary Lemco', 'Another author'],
            selectedValue: this.props.author
          }
        } handleSelector={this.selectAuthor} />

        {this.props.articles ?
          <GridList
            cellHeight={180}
          >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">{this.state.author}</ListSubheader>
            </GridListTile>
            {this.props.articles.map(article => (
              <GridListTile
                key={article.slug}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  id={article.slug}
                  onClick = {this.navigate}
                />
                <GridListTileBar
                  title={article.title}
                  subtitle={<span>by: {article.author}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        : <div/>
      }
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
