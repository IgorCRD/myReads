import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import ExamplePage from './ExamplePage'
import Search from './Search'
import { connect } from 'react-redux';
import {
  addNotification as notify,
  updateNotification,
  removeNotifications
} from 'reapop';
import BlockUI from 'react-block-ui'
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css'
import 'loaders.css/loaders.min.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    blockResultsArea: false,
  }

  getAllBooks = () => {
    return BooksAPI.getAll();
  }

  static _getSendingMessage(shelvesNames, shelfType){
    if(shelfType === 'none'){
      return 'Removing book from shelves...';
    }
    else {
      return `Sending book to ${ shelvesNames[shelfType] }...`;
    }
  }

  static _getSucessMessage(shelvesNames, shelfType){
    if(shelfType === 'none'){
      return 'Book removed.';
    }
    else {
      return `Book saved to ${ shelvesNames[shelfType] }.`;
    }
  }

  changeBookShelfHandler = (bookId, toShelf) => {
    const { notify, updateNotification } = this.props;
    let notif = notify({
      title: 'Update status',
      message: BooksApp._getSendingMessage(BooksGrid.shelfNamesByType, toShelf),
      status: 'loading',
      dismissible: false,
      dismissAfter: 0
    });
    BooksAPI.update({ id: bookId }, toShelf)
      .then( () => {
        return this.getAllBooks();
      })
      .then( (books) => {
        notif.status = 'success';
        notif.message = BooksApp._getSucessMessage(BooksGrid.shelfNamesByType, toShelf);
        notif.dismissible = true;
        notif.dismissAfter = 3000;
        updateNotification(notif);
        this.setState({ books: books })
      })
      .catch( (err) => {
        notif.status = 'error';
        notif.message = 'Sorry! Something went wrong. Please, try again in a while.';
        notif.dismissible = true;
        notif.dismissAfter = 3000;
        updateNotification(notif);
        this.setState({ books: [] })
      });
  }

  setBlockResultsArea(flag){
    this.setState({
      blockResultsArea: flag
    })
  }

  componentDidMount = () => {
    this.setBlockResultsArea(true);

    this.getAllBooks()
      .then( (books) => {
        this.setState({ books: books })
      })
      .catch( () => {
        this.setState({ books: [] })
      })
      .then( () => {  //finally
        this.setBlockResultsArea(false);
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <BlockUI tag='div' blocking={ this.state.blockResultsArea }
            style={{ minWidth: '100%', minHeight: '100%', position: 'absolute' }}
            loader={ <Loader active type='ball-spin-fade-loader' color="#3ba0f0"/> } keepInView>
            <BooksGrid books={ this.state.books } onBookShelfChange={ this.changeBookShelfHandler }/>
          </BlockUI>
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

export default withRouter(connect(null, {
  notify,
  updateNotification,
  removeNotifications
})(BooksApp));
