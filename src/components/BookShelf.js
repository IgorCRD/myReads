import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ props.name }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid" ref={ props.bookListRef } data-shelfType={ props.shelfType }>
            {
              /* li tag was kept outside book component to make it usable
              in other situations besides lists*/
              (props.books && props.books.length > 0 ) 
              ? props.books.map( (book) => (
                    <li key={ book.id } data-bookId={ book.id } >
                      <Book bookId={ book.id } cover={ (book.imageLinks) ? (book.imageLinks.thumbnail) : ('') } title={ book.title }
                        authors={ book.authors || [] } onBookShelfChange={ props.onBookShelfChange } shelf={ book.shelf }/>
                    </li>
                  )
                )
              : (<li />)
            }
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
  bookListRef: PropTypes.func,
};

export default BookShelf