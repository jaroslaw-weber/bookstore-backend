const RegisterRequest = require("../requests/RegisterRequest");
const ErrorResponse = require("../responses/ErrorResponse");
const RegisterResponse = require("../responses/RegisterResponse");
const DbPassword = require("../schema/DbPassword");
const DbUser = require("../schema/DbUser");
const PasswordService = require("./PasswordService");
const DbSession = require("../schema/DbSession");

class RegisterService {
  minPasswordLength = 8;
  dbService = new DatabaseService();
  passwordService = new PasswordService();

  /**
   * @param { RegisterRequest } request
   * @returns {Promise<RegisterResponse | ErrorResponse> }
   */
  async register(request) {
    if (request.username == undefined)
      return new ErrorResponse("empty username");
    if (request.password == undefined)
      return new ErrorResponse("password is empty");

    if (request.password.length < this.minPasswordLength)
      return new ErrorResponse("password is too short");

    try {
      let insertUser = new DbUser();
      insertUser.username = request.username;
      let dbUser = await dbService.insert(insertUser);

      let dbPassword = new DbPassword();
      dbPassword.username = request.username;
      dbPassword.password = await passwordService.hash(request.password);

      await dbService.insert(dbPassword);

      let insertSession = new DbSession();
      insertSession.userId = dbUser.id;
      let session = await dbService.insert(insertSession);

      let response = new RegisterResponse();
      response.sessionId = session.id;

      return response;
    } catch (e) {
      return new ErrorResponse(e);
    }
  }
}

module.exports = RegisterService;
