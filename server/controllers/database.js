var mongoose = require("mongoose");
var Question = require("../models/question");
var User = require("../models/user");
var Submission = require("../models/submission");
var csv = require("csv-express");
var multer = require("multer");
var path = require("path");
var FileApi = require("../api/FileApi");
var fastcsv = require("fast-csv");
const SleepUtil = require("../utils/").SleepUtil;

var config = require("../config/server-config");
const { app: { temp_directory } } = config;

exports.collection_list = function(req, res, next) {
  SleepUtil.sleep();
  const collections = [
    { name: "users" },
    { name: "questions" },
    { name: "submissions" }
  ];
  res.status(200).send(collections);
  /*
  mongoose.connection.db.listCollections().toArray(function(err, collections) {
    if (err) return next(err);
    res.status(200).send(collections);
  });*/
};

exports.collection_getall = function(req, res, next) {
  SleepUtil.sleep();
  const collectionname = req.params.name;
  if (collectionname == "questions") {
    Question.find({})
      .sort({ sequence: "asc" })
      .exec(function(err, questions) {
        if (err) return next(err);
        res.status(200).send(questions);
      });
  } else if (collectionname == "users") {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.status(200).send(users);
    });
  } else if (collectionname == "submissions") {
    Submission.find({})
      .sort({ timeupdated: "-1" })
      .exec(function(err, submissions) {
        if (err) return next(err);
        res.status(200).send(submissions);
      });
  } else {
    var error = new ValidationError(
      "body",
      "collection",
      collectionname,
      "No data is found!"
    );
    res.status(422).json({ errors: [error] });
  }
};

exports.collection_export = function(req, res, next) {
  SleepUtil.sleep();
  const name = req.params.name;
  var filename = name + ".csv";

  if (name == "questions") {
    Question.find()
      .lean()
      .exec({}, function(err, questions) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(questions, true);
      });
  } else if (name == "users") {
    User.find()
      .lean()
      .exec({}, function(err, users) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(users, true);
      });
  } else if (name == "submissions") {
    Submission.find()
      .lean()
      .exec({}, function(err, submissions) {
        if (err) return next(err);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + filename
        );
        res.csv(submissions, true);
      });
  } else {
    var error = new ValidationError(
      "body",
      "collection",
      collectionname,
      "No data is found!"
    );
    res.status(422).json({ errors: [error] });
  }
};

exports.collection_import = function(req, res, next) {
  SleepUtil.sleep();
  /*if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }*/

  var filepath = path.resolve(__dirname, "../", temp_directory);
  var filename = "";
  var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
      //console.log(file);
      cb(null, filepath);
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      const originalname = path.parse(file.originalname).name; // users
      const extension = path.parse(file.originalname).ext; // .txt
      filename = originalname + "-" + datetimestamp + extension;
      console.log(filename);
      cb(null, filename);
    }
  });

  var upload = multer({
    //multer settings
    storage: storage
  }).single("fileitem");
  //.single("fileitem")

  upload(req, res, function(err) {
    if (err) return next(err);

    const name = req.body.name;

    console.log("collection:" + name);
    const fullpath = path.resolve(filepath, filename);

    console.log("Import data for collection:" + fullpath);
    FileApi.readFile(fullpath, (err, data) => {
      if (err) return next(err);
      var list = [];
      //console.log(data.toString());
      fastcsv
        .fromString(data.toString(), {
          headers: true,
          ignoreEmpty: true
        })
        .on("data", function(data) {
          console.log(data);
          data["_id"] = new mongoose.Types.ObjectId();
          list.push(data);
        })
        .on("end", function() {
          if (name == "users") {
            console.log("import users");
            User.create(list, function(err, documents) {
              if (err) return next(err);
              res.status(200).send(documents);
            });
          } else if (name == "questions") {
            console.log("import questions");
            Question.create(list, function(err, documents) {
              if (err) return next(err);
              res.status(200).send(documents);
            });
          } else {
            res.status(200).send();
          }
        });
    });
  });
};
