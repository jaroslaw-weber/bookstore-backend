const bcrypt = require("bcrypt");

class PasswordService {
	/**
	 * @param {string} plainPassword
	 */
	hash(plainPassword) {

		let saltRounds = 10; // recommended
		return bcrypt.hash(plainPassword, saltRounds);
	}
}
module.exports = PasswordService
