var express = require("express");
var router = express.Router();
var profile_controller = require("../controllers/profile");

router.get("/read", profile_controller.profileRead);

module.exports = router;
