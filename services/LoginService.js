const LoginResponse = require("../responses/LoginResponse");
const LoginRequest = require("../requests/LoginRequest");
const ErrorResponse = require("../responses/ErrorResponse");
const PasswordService = require("./PasswordService");
const DbPassword = require("../schema/DbPassword");
const DbSession = require("../schema/DbSession");
const DbUser = require("../schema/DbUser");

class LoginService {
  dbService = new DatabaseService();
  passwordService = new PasswordService();
  
  /**
   * @param { LoginRequest } request
   * @returns { LoginResponse | ErrorResponse}
   */
  async login(request) {
    if (request.username == undefined)
      return new ErrorResponse("empty username");
    if (request.password == undefined)
      return new ErrorResponse("password is empty");

    /** @type DbPassword */
    let dbPassword = dbService.get(request.username);

    if (dbPassword == undefined)
      return new ErrorResponse("no user with this username");

    let hashedPassword = await passwordService.hash(request.password);

    let loginSuccess = hashedPassword == dbPassword.password;
    if (!loginSuccess) return new ErrorResponse("invalid password");

    /** @type DbUser */
    let dbUser = await dbService.get(dbPassword.userId);

    if (dbUser == undefined) return new ErrorResponse("user not found");

    let insertSession = new DbSession();
    insertSession.userId = dbPassword.id;
    let session = await dbService.insert(insertSession);

    let response = new LoginResponse();
    response.sessionId = session.id;
    response.user = dbUser;
    return response;
  }
}

module.exports = LoginService;
