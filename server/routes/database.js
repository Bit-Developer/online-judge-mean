var express = require("express");
var router = express.Router();

var database_controller = require("../controllers/database");

router.get("/collections", database_controller.collection_list);

router.get("/collections/:name", database_controller.collection_getall);

router.get("/export/:name", database_controller.collection_export);
router.post("/import", database_controller.collection_import);

module.exports = router;
