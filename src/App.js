import React from 'react';

import { Container } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridListTileBar } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Selector from './components/Selector';

const commons = require('./commons.js')

const BASE_URL = 'https://tjjxmcchgd.execute-api.us-east-1.amazonaws.com/Prod/'

const fetchArticlesByAuthor = function(author) {
  return new Promise(resolve => {
    // const url = new URL(`http://localhost:3001/api/searchByAuthor`);
    const url = new URL(`${BASE_URL}search/articles/v1`)
    url.search = commons.getQueryString({author});
    fetch(url.href, { qs: { author } })
    .then(res => res.json())
    .then(articles => {
      resolve(articles.Items);
    })
    .catch(err => {
      resolve([]);
    })
  })
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            author: '',
            articles: []
        }
    }

    handleSelector = event => {
        fetchArticlesByAuthor(event.target.value)
        .then(articles => {
          this.setState({
            [event.target.name]: event.target.value,
            articles
          });
        })
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
              selectedValue: this.state.author
            }
          } handleSelector={this.handleSelector} />

          <GridList cellHeight={180} >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">{this.state.author}</ListSubheader>
            </GridListTile>
            {this.state.articles.map(article => (
              <GridListTile key={article.slug}>
                <img src={article.image} alt={article.title} />
                <GridListTileBar
                  title={article.title}
                  subtitle={<span>by: {article.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${article.title}`} >
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Container>
      )
    }
}

export default App;
