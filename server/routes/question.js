var express = require("express");
var router = express.Router();

var question_controller = require("../controllers/question");

router.post("/", question_controller.question_create);

router.get("/:id", question_controller.question_readone);

router.put("/:id", question_controller.question_update);

router.delete("/:id", question_controller.question_delete);

router.get("/", question_controller.question_all);

module.exports = router;
