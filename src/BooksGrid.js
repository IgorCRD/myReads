import React, { Component } from 'react';
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const shelfNamesByType = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read',
    }

    const distinctShelfNames = [...new Set(this.props.books.map( book => book.shelf ))];
    const distinctShelfs = distinctShelfNames.map(shelfType => (
        {
          shelfName: shelfNamesByType[shelfType],
          shelfType: shelfType,
          books: this.props.books.filter(book => book.shelf === shelfType)
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
                <BookShelf name={shelf.shelfName} books={ shelf.books }/>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BooksGrid;