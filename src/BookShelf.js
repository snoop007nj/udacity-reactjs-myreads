import React, { Component } from "react";
import Book from './Book';

class BookShelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

              {this.props.books.map(book => {
                return (
                  <Book
                    handleChangeShelf={this.props.handleChangeShelf}
                    book={book}
                    key={book.id}
                  />
                )
              })}

              {/*<li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={event => this.props.handleChangeShelf(book.id, event)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                <div className="book-authors">
                  {book.authors &&
                    <div className="book-authors">
                      {book.authors[0]}
                    </div>}
                </div>
              </li>*/}
            </ol>
          </div>
      </div>
    )
  }
}


export default BookShelf;
