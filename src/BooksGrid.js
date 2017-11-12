import React, { Component } from 'react';
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    let distinctShelfs = [...new Set(this.props.books.map( book => book.shelf ))];
    distinctShelfs = distinctShelfs.map(shelfName => (
        {
          name: shelfName,
          books: this.props.books.filter(book => book.shelf === shelfName)
        }
      )
    )

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              distinctShelfs.map( (shelf) =>
                <BookShelf name={shelf.name} books={ shelf.books }/>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BooksGrid;