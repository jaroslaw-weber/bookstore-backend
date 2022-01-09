class DbUser {
	/** 
	 * id is string for better scaling
	 * https://softwareengineering.stackexchange.com/questions/361395/when-would-you-use-a-long-string-id-instead-of-a-simple-integer
	 * @type string */
	id
	/** @type string */
	username

	mock()
	{
		this.id = "tsrt3t3ien23432"
		this.username = "john"
	}
}
module.exports = DbUser

