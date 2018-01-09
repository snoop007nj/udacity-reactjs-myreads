import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks";
import Search from './Search'

import "./App.css";

class BooksApp extends React.Component {
  state = {
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

    const newShelf = event.target.value
    BooksAPI.update(book, newShelf).then(() => {
      console.log("App.handleChangeShelf book.title:", book.title, ", book.shelf:", book.shelf, ", newShelf:", newShelf)

      book.shelf = newShelf

      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    });
  };

  updateSearch = (eventSearchValue) => {
    this.setState({
      searchValue: eventSearchValue
    });

    console.log("this.state.searchValue:", this.state.searchValue)
    console.log("eventSearchValue:", eventSearchValue)

    if (eventSearchValue) {
      BooksAPI.search(eventSearchValue.trim(), 20).then((response) => {
        const searchBooks = response;
        console.log("App.updateSearch searchBooks:", searchBooks)

        if (!response || response.error || this.state.searchValue.length < 0) {
            this.setState({
              ...this.state,
              searchResults: []
            });
            return;
        }

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

      })
    }

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
              books={this.state.books}
              searchResults={this.state.searchResults}
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
