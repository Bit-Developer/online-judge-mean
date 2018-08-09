var express = require("express");
var router = express.Router();

var submission_controller = require("../controllers/submission");

// questions
router.get("/questions", submission_controller.question_all);
router.get("/question/:keys", submission_controller.question_findByKeys);

// submissions
router.post("/", submission_controller.submission_create);

router.get("/:id", submission_controller.submission_readone);

router.put("/:id", submission_controller.submission_update);

router.delete("/:id", submission_controller.submission_delete);

router.get("/one/:keys", submission_controller.submission_findByKeys);

//router.put("/:names", submission_controller.submission_update);
router.get("/all/:names", submission_controller.submission_all);

router.post("/run", submission_controller.submission_run);

module.exports = router;
