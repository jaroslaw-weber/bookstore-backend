let Book = require("../data/Book");
const {BaseResponse} = require("./BaseResponse");

class GetBooksResponse extends BaseResponse {
  /** @type Book[] */
  books;

  constructor() {
    super();
  }

  mock() {
    this.books = [];
    this.error = "test";
    {
      let book = new Book();
      book.mock();
      this.books.push(book);
    }
    {
      let book = new Book();
      book.mock();
      this.books.push(book);
    }
  }
}

module.exports = GetBooksResponse;
