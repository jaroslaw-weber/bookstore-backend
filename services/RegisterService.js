const RegisterRequest = require("../requests/RegisterRequest");
const ErrorResponse = require("../responses/ErrorResponse");
const RegisterResponse = require("../responses/RegisterResponse");
const DbPassword = require("../schema/DbPassword");
const DbUser = require("../schema/DbUser");
const PasswordService = require("./PasswordService");
const { DatabaseService, knex } = require("./DatabaseService");
const DbSession = require("../schema/DbSession");
const { userTable, passwordTable, sessionTable } = require("../tables");

const { v4: uuidv4 } = require("uuid");

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
      /** @type array */
      let searchUsers = await this.getUsers(request.username);
      if (searchUsers.length > 0) {
        return new ErrorResponse("there is already user with this username");
      }

      let user = await this.createUser(request);

      await this.createPassword(user, request);

      let session = await this.createSession(user);

      let response = new RegisterResponse();
      response.sessionId = session.id;

      return response;
    } catch (e) {
      console.log(e);
      return new ErrorResponse(e.toString());
    }
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

  /**
   * @param {DbUser} user
   * @param {RegisterRequest} request
   */
  async createPassword(user, request) {
    let password = new DbPassword();
    password.userId = user.id;
    password.password = await this.passwordService.hash(request.password);

    console.log(password.length);

    return this.dbService.insert(password, passwordTable);
  }

  /** 
   * @param {RegisterRequest} request
   */
  async createUser(request) {
    let insertUser = new DbUser();
    insertUser.username = request.username;
    insertUser.id = uuidv4();

    let dbUser = await this.dbService.insert(insertUser, userTable);
    return dbUser;
  }

  async getUsers(username) {
    return await knex.select("*").from(userTable).where("username", username);
  }
}

module.exports = RegisterService;
