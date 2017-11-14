import React, { Component } from 'react';
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }

  static shelfNamesByType = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
  }

  render() {
    const distinctShelfNames = [...new Set(this.props.books.map( book => book.shelf ))];
    const distinctShelves = distinctShelfNames
      .map(shelfType => (
          {
            shelfName: BooksGrid.shelfNamesByType[shelfType],
            shelfType: shelfType,
            books: this.props.books.filter(book => book.shelf === shelfType)
          }
        )
      )
      .sort( 
        (a, b) => {
          if(a.shelfType > b.shelfType) { return 1 }
          if(a.shelfType < b.shelfType) { return -1 }
          return 0
        }
      )


    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              distinctShelves.map( (shelf) =>
                <BookShelf key={ shelf.shelfName } name={ shelf.shelfName } books={ shelf.books }
                  onBookShelfChange={ this.props.onBookShelfChange }/>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BooksGrid;