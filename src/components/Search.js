import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import BlockUI from 'react-block-ui'
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css'
import 'loaders.css/loaders.min.css';

class Search extends React.Component {
  static propTypes = {
    onBookShelfChange: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    blockResultsArea: false,
  }

  setBlockResultsArea(flag){
    this.setState({
      blockResultsArea: flag
    })
  }

  searchHandler = (query) => {
    if(!query) { //avoids a request in case of a falsy values
      this.setState({
        books: []
      })
      return;
    }

    this.setBlockResultsArea(true);

    BooksAPI.search(query, 20)
    .then(booksResult => {
      this.setState({
        books: booksResult.map( book => {
          book.shelf = book.shelf || 'none';
          return book;
        })
      })
    })
    .catch( () => {
      this.setState({
        books: []
      })
    })
    .then( () => {  //finally
      this.setBlockResultsArea(false);
    })
  }

  render(){
    return (
      <div>
        <SearchBar onSearch={ this.searchHandler }/>
        <BlockUI tag='div' blocking={ this.state.blockResultsArea }
          style={{ minWidth: '100%', minHeight: '100%', position: 'absolute' }}
          loader={ <Loader active type='ball-spin-fade-loader' color="#3ba0f0"/> } keepInView>
          <SearchResults books={ this.state.books } onBookShelfChange={ this.props.onBookShelfChange }/>
        </BlockUI>
      </div>
    )
  }
}

export default Search