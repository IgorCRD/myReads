import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import ToSearch from './ToSearch'
import Dragula from 'react-dragula'
import '/Users/Igor/code/myReads/node_modules/react-dragula/dist/dragula.min.css'
import TrashBin from './TrashBin'

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

  state = {
    dragging: false
  }

  dropAreas = [];

  static _separateBooksByShelfType(books, showAllShelves){
    const setOfShelves = new Set(
        showAllShelves ?
        Object.keys(BooksGrid.shelfNamesByType) :
        books.map( book => book.shelf )
      );
    const distinctShelfNames = [...setOfShelves];
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

  _registerDragAndDropEvents = () => {
    let options = { revertOnSpill: true };
    const drake = Dragula(this.dropAreas, options);
    drake.on('drop', (bookBeingMoved, toThisShelf) => {
      drake.cancel(true); //undo manual DOM manipulation made by dragula component
      this.props.onBookShelfChange(
        bookBeingMoved.getAttribute('data-bookId'), 
        toThisShelf.getAttribute('data-shelftype'));
    });
    drake.on('drag', () => {
      this.setState({ dragging: true } );
    })
    drake.on('dragend', () => {
      this.setState({ dragging: false } );
    })
    drake.on('over', (bookBeingMoved, aboveContainer) => {
      if(TrashBin.isTrashBinContainer(aboveContainer)){
        aboveContainer.classList.add('trash-bin-hover');
      }
    })
    drake.on('out', (bookBeingMoved, outOfContainer) => {
      if(TrashBin.isTrashBinContainer(outOfContainer)){
        outOfContainer.classList.remove('trash-bin-hover');
      }
    })
  }

  _registerAutoScrollWhenDraggingEvents = () => {
    window.addEventListener('mousemove', (mouseEvent) => {
      this._pageY = mouseEvent.pageY;
      if(this.state.dragging){
        const tenPerCentOfWindowHeight = window.innerHeight*0.1;
        if(mouseEvent.clientY <= tenPerCentOfWindowHeight){
          this._scrollUp(this._pageY);
        }
        if(mouseEvent.clientY >= window.innerHeight - tenPerCentOfWindowHeight){
          this._scrollDown(this._pageY);
        }
      }
    })
  }

  _scrollDown = (pageY) => {
    if (this.state.dragging && pageY === this._pageY) {
      window.scrollBy(0, 5);
      setTimeout(this._scrollDown.bind(this, pageY), 15);
    }
  }

  _scrollUp (pageY) {
    if (this.state.dragging && pageY === this._pageY) {
      window.scrollBy(0, -5);
      setTimeout(this._scrollUp.bind(this, pageY), 15);
    }
  }

  componentDidMount(){
    /*** REGISTER DRAG AND DROP EVENTS */
    this._registerDragAndDropEvents();

    /*** REGISTER AUTO SCROLL WHILE DRAGGING EVENTS */
    this._registerAutoScrollWhenDraggingEvents();
  }

  setBookListRef = (bookList) => {
    this.dropAreas.push(bookList);
  }

  setTrashBinRef = (trashBin) => {
    this.dropAreas.push(trashBin);
  }

  render() {
    // if there is a book being dragged then show all shelves
    const shelves = BooksGrid._separateBooksByShelfType(this.props.books, this.state.dragging);

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
            {
              this.state.dragging
              ? <TrashBin trashBinRef={ this.setTrashBinRef }/>
              : <ToSearch />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BooksGrid;