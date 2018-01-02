import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  getBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data
      });
    });
  };

  componentDidMount() {
    this.getBooks();
  }

  handleChangeShelf = (bookId, newShelf) => {
    console.log("this.state:", this.state)
    //Find the book that needs to be moved
    let book = this.state.books.filter(book => book.id === bookId)[0];
    console.log("book to move:", book)

    //Update DB - Move the book to the new shelf
    BooksAPI.update(book, newShelf).then(() => {
      BooksAPI.getAll().then((data) => {
        this.setState({
          books: data
        });
      });
    });
  };

  render() {

    console.log("App this.state.books:", this.state.books)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.handleChangeShelf}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
