import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.cover}")` }}>
          </div>
          <BookShelfChanger bookId={ this.props.bookId } onBookShelfChange={ this.props.onBookShelfChange }
            currentShelf={ this.props.shelf }/>
        </div>
        <div className="book-title">{ this.props.title }
        </div>
        {
          this.props.authors.map( (author) => (
              <div key={ author }className="book-authors">{ author }
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default Book;