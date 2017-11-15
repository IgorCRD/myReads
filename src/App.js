import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import ExamplePage from './ExamplePage'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  changeBookShelfHandler = (bookId, toShelf) => {
    BooksAPI.update({ id: bookId }, toShelf)
      .then( () => {
        BooksAPI.getAll()
          .then( (books) => {
            this.setState({ books: books })
          })
          .catch( () => {
            this.setState({ books: [] })
          })
      });
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then( (books) => {
        this.setState({ books: books })
      })
      .catch( () => {
        this.setState({ books: [] })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
            <BooksGrid books={ this.state.books } onBookShelfChange={ this.changeBookShelfHandler }/>
          )
        } />
        <Route exact path='/search' render={ () => (
            <Search onBookShelfChange={ this.changeBookShelfHandler }/>
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
