var express = require("express");
var router = express.Router();
const passport = require("passport"); // Because of the OPTIONS request, we can't add authorization check in the index.js, we have to apply it here, one by one.

var question_controller = require("../controllers/question");

router.post("/", question_controller.question_create);

router.get("/:id", question_controller.question_readone);

router.put("/:id", question_controller.question_update);

router.delete("/:id", question_controller.question_delete);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  question_controller.question_all
);

module.exports = router;
