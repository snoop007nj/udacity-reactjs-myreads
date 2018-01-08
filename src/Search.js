import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class Search extends Component {

  state = {
    books: [],
    searchResults: [],
    searchValue: ''
  }

  componentWillReceiveProps = (books) => {
    console.log("Search.componentWillReceiveProps books:", books)
  }

  render() {

    console.log("Search this.state.books:", this.state.books)
    console.log("Search this.props.searchResults:", this.props.searchResults)

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
