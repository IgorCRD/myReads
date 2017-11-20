import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchResults extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.props.books.map( (book) => (
              <li key={ book.id }>
                <Book bookId={ book.id } shelf={ book.shelf }
                  authors={ book.authors || [] } onBookShelfChange={ this.props.onBookShelfChange }
                  cover={ (book.imageLinks) ? (book.imageLinks.thumbnail) : ('') } title={ book.title } />
              </li>
            ))
          }
        </ol>
      </div>
    )
  }
}

export default SearchResults