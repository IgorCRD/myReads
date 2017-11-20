import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'

class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <DebounceInput type="text" placeholder="Search by title or author"
            debounceTimeout={ 300 } inputRef={(DebounceInput) => { this.searchInput = DebounceInput; }}
            onChange={ event => this.props.onSearch(event.target.value) }/>
        </div>
      </div>
    );
  }
}

export default SearchBar