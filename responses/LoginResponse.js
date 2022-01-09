const BaseRequest = require("../requests/BaseRequest");

class LoginResponse extends BaseRequest {
	/** @type string */
	sessionId;
}

module.exports = LoginResponse
