import React from 'react';

import { Container } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridListTileBar } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import AuthorInput from './AuthorInput';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  SEARCH_PAGE_LOADED,
  SEARCH_PAGE_UNLOADED,
  SEARCH_COMPLETE,
  SEARCH_ERROR,
  AUTHOR_SELECTED,
  ARTICLE_SELECTED,
  ARTICLE_LOAD_FAILED,
 } from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.search,
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
  componentDidMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  // It is ALWAYS important to pass the `props`
  // in both the constructor invocation and the super invocation:
  // https://reactjs.org/docs/react-component.html#constructor
  constructor(props) {
      super(props);
      this.state = {
          author: '',
          articles: []
      }
      this.navigate = this.navigate.bind(this);
  }

  navigate = event => {
    const slug = event.target.id;
    this.props.onArticleSelected(slug)
  }

  selectAuthor = event => {
    this.props.onAuthorSelected(event.target.value);
    Promise.all([agent.Searches.byAuthor(event.target.value)])
    .then(res => this.props.onSearchComplete(res[0].Items))
    .catch(err => this.props.onSearchFailed(err));
  }

  render() {
    return (
      <Container>
        <AuthorInput
          handleSelection={this.selectAuthor}
          authors={['Gary Lemco', 'Another author']}
        />
        {this.props.articleSelected ?
          <Redirect to={'/article/'+this.props.slug} />
          : <div/>
        }
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
