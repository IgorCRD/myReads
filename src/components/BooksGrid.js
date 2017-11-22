import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import ToSearch from './ToSearch'
import Dragula from 'react-dragula'
import '/Users/Igor/code/myReads/node_modules/react-dragula/dist/dragula.min.css'

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

  bookLists = [];

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

  componentDidMount(){
    let options = {};
    const drake = Dragula(this.bookLists, options);
    drake.on('drop', (bookBeingMoved, toThisShelf) => {
      drake.cancel(true); //undo manual DOM manipulation made by dragula component
      this.props.onBookShelfChange(
        bookBeingMoved.getAttribute('data-bookId'), 
        toThisShelf.getAttribute('data-shelftype'));
    });
  }

  setBookListRef = (bookList) => {
    this.bookLists.push(bookList);
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
                <BookShelf key={ shelf.shelfType } shelfType={ shelf.shelfType } name={ shelf.shelfName }
                  books={ shelf.books } onBookShelfChange={ this.props.onBookShelfChange }
                  bookListRef={ this.setBookListRef }/>
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