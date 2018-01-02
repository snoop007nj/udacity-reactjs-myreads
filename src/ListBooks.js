import React, { Component } from "react";
import BookShelf from "./BookShelf";

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
            onChangeShelf={this.props.onChangeShelf}
          />
          <BookShelf
            bookshelfTitle="Want to Read"
            books={wantToRead}
            onChangeShelf={this.props.onChangeShelf}
          />
          <BookShelf
            bookshelfTitle="Read"
            books={read}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
        {/*<div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>*/}
      </div>
    )
  }

}

export default ListBooks;
