var express = require("express");
var router = express.Router();

var user_controller = require("../controllers/user");

//router.post("/", user_controller.user_create);

router.get("/:id", user_controller.user_readone);

//router.put("/:id", user_controller.user_update);

router.delete("/:id", user_controller.user_delete);

// reset user's password to default '123456'
router.patch("/reset", user_controller.user_resetpwd);

router.get("/", user_controller.user_all);

module.exports = router;
