class Book{
	/** @type number */
	id
	/** @type string */
	title
	/** @type string */
	description
	
    constructor()
    {
    }

	mock()
	{
		this.id = 1
		this.title = "Some Book Title"
		this.description = "Book description."
	}
}
module.exports = Book


