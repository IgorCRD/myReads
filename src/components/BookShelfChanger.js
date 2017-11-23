import React from 'react';
import PropTypes from 'prop-types'

const BookShelfChanger = (props) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={ (event) => props.onBookShelfChange(props.bookId, event.target.value) }
        value={ props.currentShelf || 'none' }>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookShelfChanger.propTypes = {
  onBookShelfChange: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  currentShelf: PropTypes.string,
};

export default BookShelfChanger