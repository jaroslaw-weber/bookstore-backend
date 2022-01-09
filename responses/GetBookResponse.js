let Book = require("../data/Book");
const  {BaseResponse}  = require("./BaseResponse");


class GetBookResponse extends BaseResponse
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