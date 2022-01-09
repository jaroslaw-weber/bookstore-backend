const Error = require("../data/Error");
const { BaseResponse } = require("./BaseResponse");

class ErrorResponse extends BaseResponse {
	constructor(message) {
		super();
		this.error = new Error();
		this.error.message = message

	}
}

module.exports = ErrorResponse
