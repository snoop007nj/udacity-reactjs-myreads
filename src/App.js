import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks";
import Search from './Search'

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
    books: [],
    searchResults: [],
    searchValue: ''
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

  //handle changes to shelf
  handleChangeShelf = (book, event) => {
    console.log("App.handleChangeShelf this.state:", this.state)
    //Find the book that needs to be moved
    //const book = this.state.books.filter(book => book.id === bookId)[0];
    //console.log("App.handleChangeShelf book to move:", book)

    //Update DB - Move the book to the new shelf
    const newShelf = event.target.value
    BooksAPI.update(book, newShelf).then(() => {
      BooksAPI.getAll().then((data) => {

        //re-render view
        this.setState({
          books: data
        });
      });
    });
  };

  updateSearch = (event) => {
    this.setState({
      searchValue: event.target.value
    });

    console.log("this.state.searchValue:", this.state.searchValue)

    BooksAPI.search(event.target.value.trim(), 1).then((response) => {
      const searchBooks = response;
      console.log("searchBooks:", searchBooks);

      if (!response || response.error || this.state.searchValue.length < 1) {
          this.setState({
            ...this.state,
            searchResults: []
          });
      } else {
        this.state.books.forEach(shelfBook => {
          searchBooks.forEach(searchBook => {
            //console.log("shelfBook.id:", shelfBook.id, ",shelfBook.shelf:", shelfBook.shelf, ",searchBook.id:", searchBook.id, ",searchBook.shelf:", searchBook.shelf);
            if (!searchBook.shelf) {
                searchBook.shelf = 'none';
            }

            if (shelfBook.id === searchBook.id) {
              searchBook.shelf = shelfBook.shelf;
              console.log("this.state.searchValue:", this.state.searchValue, ", shelfBook.id:", shelfBook.id, ",shelfBook.shelf:", shelfBook.shelf, ",searchBook.id:", searchBook.id, ",searchBook.shelf:", searchBook.shelf);
            }
          })
        });

        this.setState({
          ...this.state,
          searchResults: searchBooks
        });
      }
    })
      .catch(console.error);
  };

  render() {

    console.log("App this.state.books:", this.state.books)

    console.log("App this.state.searchValue:", this.state.searchValue)

    console.log("App this.state.searchResults:", this.state.searchResults)

    return (
      <div className="app">
        <Route path="/" exact
          render={() => (
            <ListBooks
              books={this.state.books}
              handleChangeShelf={this.handleChangeShelf}
            />
          )}
        />
        <Route path="/search" exact
          render={() => (
            <Search
              books={this.state.searchResults}
              searchValue={this.state.searchValue}
              updateSearch={this.updateSearch}
              handleChangeShelf={this.handleChangeShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
