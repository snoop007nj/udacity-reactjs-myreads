import React, { Component } from 'react';

class Book extends Component {
  render () {
    return (
      <li key={this.props.book.id} className="book">
        <div className="book-top">
          {this.props.book.imageLinks ?
            (<div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
                }}
              />
            ):(
            <div
              className="book-cover"
              style={{
                width: 150,
                height: 200,
                backgroundImage: `url(http://via.placeholder.com/128x193?text=No%20Cover)`
              }}
            />)
          }
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={event => this.props.handleChangeShelf(this.props.book, event)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {this.props.book.title}
        </div>
        <div className="book-authors">
          {this.props.book.authors &&
            <div className="book-authors">
              {this.props.book.authors.join(', ')}
            </div>}
        </div>
      </li>
    )
  }
}


export default Book;
