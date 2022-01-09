const = require("../requests/BaseRequest");
const BaseResponse = require("./BaseResponse");

class RegisterResponse extends BaseResponse {
  /** @type string */
  sessionId;
}
module.exports = RegisterResponse

