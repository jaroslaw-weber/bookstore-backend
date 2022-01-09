var express = require("express");
const { send } = require("express/lib/response");
const LoginService = require("../services/LoginService");
const RegisterService = require("../services/RegisterService");
const { RouteHelper } = require("./RouteHelper");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res) {
  let service = new LoginService();
  let response = await service.login(req.body);
  res.send(response);
});

router.post("/register", async function (req, res) {
  let service = new RegisterService();
  let response = await service.register(req.body);
  new RouteHelper().send(res, response);
});

module.exports = router;
