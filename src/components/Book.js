import React from 'react';
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'
import coverNotFound from '../media/booknocoverimage.jpg'

const Book = (props) => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.cover || coverNotFound}")`, backgroundSize: '100%' }}>
        </div>
        <BookShelfChanger bookId={ props.bookId } onBookShelfChange={ props.onBookShelfChange }
          currentShelf={ props.shelf }/>
      </div>
      <div className="book-title">{ props.title }
      </div>
      {
        props.authors.map( (author) => (
            <div key={ author } className="book-authors">{ author }
            </div>
          )
        )
      }
    </div>
  );
}

Book.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  onBookShelfChange: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  shelf: PropTypes.string,
};

export default Book;