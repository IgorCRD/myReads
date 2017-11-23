import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const SearchResults = (props) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {
          props.books.map( (book) => (
            <li key={ book.id }>
              <Book bookId={ book.id } shelf={ book.shelf }
                authors={ book.authors || [] } onBookShelfChange={ props.onBookShelfChange }
                cover={ (book.imageLinks) ? (book.imageLinks.thumbnail) : ('') } title={ book.title } />
            </li>
          ))
        }
      </ol>
    </div>
  )
}

SearchResults.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
}

export default SearchResults