const LoginResponse = require("../responses/LoginResponse");
const LoginRequest = require("../requests/LoginRequest");
const ErrorResponse = require("../responses/ErrorResponse");
const PasswordService = require("./PasswordService");
const DbPassword = require("../schema/DbPassword");
const DbSession = require("../schema/DbSession");
const DbUser = require("../schema/DbUser");
const { DatabaseService, knex } = require("./DatabaseService");
const { userTable, passwordTable, sessionTable } = require("../tables");
const { v4: uuidv4 } = require("uuid");

class LoginService {
  dbService = new DatabaseService();
  passwordService = new PasswordService();
  userTable;
  /**
   * @param { LoginRequest } request
   * @returns { LoginResponse | ErrorResponse}
   */
  async login(request) {
    if (request.username == undefined)
      return new ErrorResponse("empty username");
    if (request.password == undefined)
      return new ErrorResponse("password is empty");
    try {
      let user = await this.getUser(request);

      if (user == undefined) {
        return new ErrorResponse("user not found");
      }

      /** @type DbPassword */
      let passwordOk = await this.checkPassword(user, request);

      if (!passwordOk) return new ErrorResponse("invalid password");

      let session = await this.createSession(user);

      let response = new LoginResponse();
      response.sessionId = session.id;
      response.user = user;
      return response;
    } catch (e) {
      console.log(e);
      return new ErrorResponse(e.toString());
    }
  }

  /**
   * @returns {Promise<Boolean>}
   * @param {DbUser} user
   * @param {LoginRequest} request
   */
  async checkPassword(user, request) {
    let password = await knex
      .select("*")
      .from(passwordTable)
      .where("userId", user.id)
      .first();

    let passwordOk = await this.passwordService.compare(
      request.password,
      password.password
    );
    return passwordOk;
  }

  /**
   * @returns {Promise<DbUser>}
   * @param {LoginRequest} request
   */
  async getUser(request) {
    return await knex
      .select("*")
      .from(userTable)
      .where("username", request.username)
      .first();
  }

  /**
   * @param {DbUser} user
   */
  async createSession(user) {
    let insertSession = new DbSession();
    insertSession.userId = user.id;
    insertSession.id = uuidv4();
    return await this.dbService.insert(insertSession, sessionTable);
  }
}

module.exports = LoginService;
