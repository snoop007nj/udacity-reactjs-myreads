import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from 'react-router-dom';

class ListBooks extends Component {

  render() {

    console.log("ListBooks this.props.books:", this.props.books)
    const currentlyReading = this.props.books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = this.props.books.filter(book => book.shelf === "wantToRead")
    const read = this.props.books.filter(book => book.shelf === "read")
    console.log("ListBooks currentlyReading:", currentlyReading)
    console.log("ListBooks wantToRead:", wantToRead)
    console.log("ListBooks read:", read)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <BookShelf
            bookshelfTitle="Currently Reading"
            books={currentlyReading}
            handleChangeShelf={this.props.handleChangeShelf}
          />
          <BookShelf
            bookshelfTitle="Want to Read"
            books={wantToRead}
            handleChangeShelf={this.props.handleChangeShelf}
          />
          <BookShelf
            bookshelfTitle="Read"
            books={read}
            handleChangeShelf={this.props.handleChangeShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }

}

export default ListBooks;
