const LoginResponse = require("../responses/LoginResponse");
const LoginRequest = require("../requests/LoginRequest");
const ErrorResponse = require("../responses/ErrorResponse");

class LoginService
{
	/** 
	 * @param { LoginRequest } request
	 * @returns { LoginResponse | ErrorResponse}
	 */
	async login(request)
	{
		if (request.username == undefined) return new ErrorResponse("empty username")
		if (request.password == undefined) return new ErrorResponse("password is empty")
	  
		let user 
		let sessionId = "xtsta3taa3taw2a2tr";
	  
		let response = new LoginResponse()
		response.sessionId = sessionId;
		return response
	}
}

module.exports = LoginService

