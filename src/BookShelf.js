import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.name }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {
                /* li tag was kept outside book component to make it usable
                in other situations besides lists*/
                this.props.books.map( (book) => (
                    <li key={ book.id }>
                      <Book bookId={ book.id } cover={ book.imageLinks.thumbnail } title={ book.title }
                        authors={ book.authors } onBookShelfChange={ this.props.onBookShelfChange } shelf={ book.shelf }/>
                    </li>
                  )
                )
              }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf