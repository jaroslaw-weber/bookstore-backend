
const ErrorResponse = require("../responses/ErrorResponse");

class RouteHelper{
/**
 * @template T
 * @param {ExpressResponse} res
 * @param { T | ErrorResponse} response
 */
 send(res, response) {
  if (typeof response == typeof ErrorResponse) {
    res.status(401).send(response);
  }
  res.send(response);
}
}

exports.RouteHelper = RouteHelper