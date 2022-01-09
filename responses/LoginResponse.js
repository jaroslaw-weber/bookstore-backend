const BaseRequest = require("../requests/BaseRequest");
const DbUser = require("../schema/DbUser");

class LoginResponse extends BaseRequest {
	/** @type string */
	sessionId;

/** @type DbUser */
user

}
module.exports = LoginResponse
