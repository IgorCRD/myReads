import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import ToSearch from './ToSearch'

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

  static _separateBooksByShelfType(books){
    const distinctShelfNames = [...new Set(books.map( book => book.shelf ))];
    const distinctShelves = distinctShelfNames
      .map(shelfType => (
          {
            shelfName: BooksGrid.shelfNamesByType[shelfType],
            shelfType: shelfType,
            books: books.filter(book => book.shelf === shelfType)
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
    
    return distinctShelves;
  }

  render() {
    const shelves = BooksGrid._separateBooksByShelfType(this.props.books)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              shelves.map( (shelf) =>
                <BookShelf key={ shelf.shelfName } name={ shelf.shelfName } books={ shelf.books }
                  onBookShelfChange={ this.props.onBookShelfChange }/>
              )
            }
          </div>
        </div>
        <ToSearch />
      </div>
    );
  }
}

export default BooksGrid;