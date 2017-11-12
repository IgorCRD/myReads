import React, { Component } from 'react';
import BookShelf from './BookShelf'

class BooksGrid extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksGrid;