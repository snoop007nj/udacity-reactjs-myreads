MyReads is a project from Udacity's React Nanodegree course. This is a bookshelf app that lets you to organize books that you have read.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). A subset of [instructions](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) is shown bellow:

## Table of Contents

- [Folder Structure](#folder-structure)
- [Backend Server](#back-end-server)
- [Available Scripts](#available-scripts)
  - [yarn install](#yarn-install)
  - [yarn start](#yarn-start)
- [Important](#important)

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the dependencies.<br>

### `yarn start`

Launches the test runner in the interactive watch mode.<br>

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
