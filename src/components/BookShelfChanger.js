import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
    onBookShelfChange: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired,
    currentShelf: PropTypes.string,
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={ (event) => this.props.onBookShelfChange(this.props.bookId, event.target.value) }
          value={ this.props.currentShelf || 'none' }>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger