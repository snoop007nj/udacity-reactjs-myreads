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
  handleChangeShelf = (bookId, event) => {
    console.log("this.state:", this.state)
    //Find the book that needs to be moved
    const book = this.state.books.filter(book => book.id === bookId)[0];
    console.log("book to move:", book)

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
  };

  render() {

    console.log("App this.state.books:", this.state.books)

    console.log("App this.state.searchValue:", this.state.searchValue)

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
              books={this.state.books}
              searchValue={this.state.searchValue}
              updateSearch={this.updateSearch}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
