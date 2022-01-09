var express = require("express");
const LoginService = require("../services/LoginService");
const RegisterService = require("../services/RegisterService");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", function (req, res, next) {
  let service = new LoginService()
  let response = service.login(req.body)
  res.send(response);
});

router.post("/register", function (req, res, next) {
  let service = new RegisterService()
  let response = service.register(req.body)
  res.send(response);
});

module.exports = router;
