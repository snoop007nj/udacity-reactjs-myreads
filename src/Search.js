import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.props.searchValue}
              onChange={event => this.props.updateSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults.map((book) =>
              <Book
                handleChangeShelf={this.props.handleChangeShelf}
                book={book}
                key={book.id}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
