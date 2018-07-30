var Question = require("../models/question");
const ValidationError = require("../models/validationerror");
const SleepUtil = require("../utils/").SleepUtil;

exports.question_create = function(req, res, next) {
  SleepUtil.sleep();
  var question = new Question({
    sequence: req.body.sequence,
    title: req.body.title,
    uniquename: req.body.uniquename,
    description: req.body.description,
    mainfunction: req.body.mainfunction,
    jsmain: req.body.jsmain,
    pythonmain: req.body.pythonmain,
    solution: req.body.solution,
    difficulty: req.body.difficulty,
    frequency: req.body.frequency,
    rating: req.body.rating,
    hints: req.body.hints
  });

  question.save({ new: true }, function(err, question) {
    if (err) {
      return next(err);
    }
    res.status(200).send(question);
  });
};

exports.question_readone = function(req, res, next) {
  SleepUtil.sleep();
  Question.findById(req.params.id, function(err, question) {
    if (err) {
      return next(err);
    }
    res.status(200).send(question);
  });
};

exports.question_update = function(req, res, next) {
  SleepUtil.sleep();
  console.log(req.body);
  Question.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, question) {
      if (err) return next(err);
      res.status(200).send(question);
    }
  );
};

exports.question_delete = function(req, res, next) {
  SleepUtil.sleep();
  Question.findByIdAndRemove(req.params.id, function(err, question) {
    if (err) return next(err);
    res.status(200).send(question);
  });
};

exports.question_all = function(req, res, next) {
  SleepUtil.sleep();
  Question.find({})
    .sort({ sequence: "asc" })
    .exec(function(err, questions) {
      if (err) return next(err);
      res.status(200).send(questions);
    });
};
