var express = require("express");
var router = express.Router();
var database = require("./database");
var authentication = require("./authentication");
var question = require("./question");
var user = require("./user");
var submission = require("./submission");
var config = require("../config/server-config");

const { app: { secret } } = config;

var jwt = require("express-jwt");
var auth = jwt({
  secret: secret,
  userProperty: "payload" // the default name is user, changed to payload to avoid ambiguousness
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "Hello! welcome to our api!" });
});

// authentication, url: /api/authentication/login
router.use("/authentication", authentication);
// question, url: /api/admin/question
router.use("/admin/question", auth, question);
// user, url: /api/admin/user
router.use("/admin/user", auth, user);
// database, url: /api/admin/database
router.use("/admin/database", database);
// submission, url: /api/submission
router.use("/submission", submission);

module.exports = router;
