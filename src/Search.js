import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends React.Component {
  static propTypes = {
    onBookShelfChange: PropTypes.func.isRequired,
  }

  state = {
    books: []
  }

  searchHandler = (query) => {
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
  }

  render(){
    return (
      <div>
        <SearchBar onSearch={ this.searchHandler }/>
        <SearchResults books={ this.state.books } onBookShelfChange={ this.props.onBookShelfChange }/>
      </div>
    ) 
  }
}

export default Search