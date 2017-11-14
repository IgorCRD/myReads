import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import ExamplePage from './ExamplePage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  changeBookShelf = (bookId, fromShelf, toShelf) => {
    // retrieving the book to update and removing the property shelf from the object
    const { shelf, ...bookToUpdate } = this.state.books.filter( (book) => book.id === bookId)[0];
    debugger;
    if(toShelf !== 'none') {
      bookToUpdate.shelf = toShelf;
    }

    this.setState( (state) => (
      {
        books: state.books
          .map( (book) => (book.id === bookId) ? bookToUpdate : book )
          .filter( (book) => book.hasOwnProperty('shelf') && book.shelf !== 'none')
      }
    ))

    BooksAPI.update(bookToUpdate, toShelf);
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
            <BooksGrid books={this.state.books} onBookShelfChange={ this.changeBookShelf }/>
          )
        } />
        <Route exact path='/search' render={ () => (
            <div>
              <SearchBar />
              <SearchResults />
            </div>
          )
        } />
        <Route exact path='/example' render={ () => (
            <ExamplePage />
          )
        } />
      </div>
    )
  }
}

export default BooksApp
