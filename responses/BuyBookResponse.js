let Book = require("../data/Book");
const GetBookResponse = require("./GetBookResponse");


class BuyBookResponse extends GetBookResponse
{
	/** @type Book */
	book;

    constructor()
    {
        super();
    }

	mock()
	{
		this.book = new Book()
		this.book.mock()
	}
}

module.exports = GetBookResponse

