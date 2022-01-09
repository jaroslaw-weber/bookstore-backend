
const BaseResponse = require("./BaseResponse");
const DbUser = require("../schema/DbUser");

class RegisterResponse extends BaseResponse {
  /** @type string */
  sessionId;
  
/** @type DbUser */
	user
}
module.exports = RegisterResponse

