var express = require("express");
var router = express.Router();
const passport = require("passport"); // Because of the OPTIONS request, we can't add authorization check in the index.js, we have to apply it here, one by one.
var database_controller = require("../controllers/database");

router.get("/collections", database_controller.collection_list);

router.get("/collections/:name", database_controller.collection_getall);

router.get(
  "/export/:name",
  passport.authenticate("jwt", { session: false }),
  database_controller.collection_export
);
router.post(
  "/import",
  passport.authenticate("jwt", { session: false }),
  database_controller.collection_import
);

module.exports = router;
