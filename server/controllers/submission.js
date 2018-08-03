const Question = require("../models/question");
const Submission = require("../models/submission");
const ValidationError = require("../models/validationerror");
const ErrorUtil = require("../utils/").ErrorUtil;
const RunnerManager = require("../compiler/RunnerManager");
const moment = require("moment");
const SleepUtil = require("../utils/").SleepUtil;

// questions
exports.question_all = function(req, res, next) {
  SleepUtil.sleep();
  Question.find({})
    .sort({ sequence: "asc" })
    .exec(function(err, questions) {
      if (err) return next(err);
      res.status(200).send(questions);
    });
};

exports.question_findByKeys = function(req, res, next) {
  SleepUtil.sleep();
  var strKeys = req.params.keys;
  if (!strKeys) {
    var error = ErrorUtil.buildError("Invalid parameter: keys");
    return res.status(422).json({ errors: [error] });
  }
  var keys = strKeys.split(",");
  if (keys.length != 2) {
    var error = ErrorUtil.buildError("Invalid parameter: keys");
    return res.status(422).json({ errors: [error] });
  }

  Question.findOne({ uniquename: keys[0] }, function(err, question) {
    if (err) {
      return next(err);
    }
    if (!question) {
      var error = new ValidationError(
        "body",
        "uniquename",
        req.params.uniquename,
        "No question is found!"
      );
      res.status(422).json({ errors: [error] });
    }

    //console.log(submissions);
    var retq = {
      _id: question._id,
      sequence: question.sequence,
      title: question.title,
      uniquename: question.uniquename,
      description: question.description,
      mainfunction: question.mainfunction,
      jsmain: question.jsmain,
      pythonmain: question.pythonmain,
      solution: question.solution,
      difficulty: question.difficulty,
      frequency: question.frequency,
      rating: question.rating,
      hints: question.hints,
      id1: "",
      id2: "",
      id3: ""
    };

    // get submissions if exist
    if (keys[1]) {
      console.log(keys[1]);
      // find the latest one with the given user name, quenstion name and language
      /*
      db.submissions.aggregate([
          { $sort: { "timecreated": -1 } },
          { $group: { _id: "$language", latest: { $first: "$$ROOT" } }},
          { $project : {_id : "$latest._id", username : "$latest.username", questionname : "$latest.questionname", solution : "$latest.solution", language : "$latest.language", status : "$latest.status", timeupdated : "$latest.timeupdated", timesubmitted : "$latest.timesubmitted", runtime : "$latest.runtime" }},
          { $sort: { "language": 1 } }
      ]).pretty()
      */
      Submission.aggregate(
        [
          { $match: { questionname: keys[0], username: keys[1] } },
          { $sort: { timeupdated: -1 } },
          { $group: { _id: "$language", latest: { $first: "$$ROOT" } } },
          {
            $project: {
              _id: "$latest._id",
              username: "$latest.username",
              questionname: "$latest.questionname",
              solution: "$latest.solution",
              language: "$latest.language",
              status: "$latest.status",
              timeupdated: "$latest.timeupdated",
              timesubmitted: "$latest.timesubmitted",
              runtime: "$latest.runtime"
            }
          },
          { $sort: { language: 1 } }
        ],
        function(err, submissions) {
          if (err) {
            return next(err);
          }
          if (submissions) {
            // replace the solution in question with user's submission
            for (var i = 0; i < submissions.length; i++) {
              const submission = submissions[i];
              if (submission.language == "java") {
                retq.mainfunction = submission.solution;
                if (submission.status == "initial") {
                  retq.id1 = submission._id;
                }
              } else if (submission.language == "javascript") {
                retq.jsmain = submission.solution;
                if (submission.status == "initial") {
                  retq.id2 = submission._id;
                }
              } else if (submission.language == "python") {
                retq.pythonmain = submission.solution;
                if (submission.status == "initial") {
                  retq.id3 = submission._id;
                }
              }
            }
          }
          console.log(retq.id1);
          console.log(retq);
          res.status(200).send(retq);
        }
      );
    } else {
      // user not logged in yet, just return question
      res.status(200).send(retq);
    }
  });
};

exports.submission_create = function(req, res, next) {
  SleepUtil.sleep();
  //sleep.sleep(3); //sleep for 3 seconds
  var submission = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: "initial", // not submitted -> just created
    timeupdated: moment(new Date(Date.now())),
    timesubmitted: null,
    runtime: 0
  });

  submission.save({ new: true }, function(err, submission) {
    if (err) {
      return next(err);
    }
    res.status(200).send(submission);
  });
};

exports.submission_readone = function(req, res, next) {
  SleepUtil.sleep();
  Submission.findById(req.params.id, function(err, submission) {
    if (err) {
      return next(err);
    }
    res.status(200).send(submission);
  });
};

exports.submission_update = function(req, res, next) {
  SleepUtil.sleep();
  var upd = {
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: "initial",
    timeupdated: moment(new Date(Date.now()))
  };

  Submission.findOne({ _id: req.params.id }, function(err, submission) {
    if (err) {
      return next(err);
    }
    if (submission && submission.status != "initial") {
      var error = ErrorUtil.buildError(
        "Can't update solution which has already been submitted!"
      );
      return res.status(422).json({ errors: [error] });
    } else {
      Submission.findByIdAndUpdate(
        req.params.id,
        { $set: upd },
        { new: true },
        function(err, submission) {
          if (err) return next(err);
          res.status(200).send(submission);
        }
      );
    }
  });
};

exports.submission_findByKeys = function(req, res, next) {
  SleepUtil.sleep();
  console.log(req.params.keys);
  var strKeys = req.params.keys;
  if (!strKeys) {
    var error = ErrorUtil.buildError("Invalid parameter: keys");
    return res.status(422).json({ errors: [error] });
  }
  var keys = strKeys.split(",");
  if (keys.length != 3) {
    var error = ErrorUtil.buildError("Invalid parameter: keys");
    return res.status(422).json({ errors: [error] });
  }

  // find the latest one with the given user name, quenstion name and language
  Submission.findOne(
    { username: keys[0], questionname: keys[1], language: keys[2] },
    null,
    { sort: { timecreated: -1 } },
    function(err, submission) {
      if (err) {
        return next(err);
      }
      if (submission) {
        console.log(submission);
        res.status(200).send(submission);
      } else {
        res.status(200).send();
      }
    }
  );
};

exports.submission_delete = function(req, res, next) {
  SleepUtil.sleep();
  Submission.findByIdAndRemove(req.params.id, function(err, submission) {
    if (err) return next(err);
    res.status(200).send(submission);
  });
};

exports.submission_all = function(req, res, next) {
  SleepUtil.sleep();
  console.log(req.params.names);
  var strname = req.params.names;
  if (!strname) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    return res.status(422).json({ errors: [error] });
  }
  var names = strname.split(",");
  if (names.length != 2) {
    var error = ErrorUtil.buildError("Invalid parameter: names");
    return res.status(422).json({ errors: [error] });
  }

  Submission.find({
    username: names[0],
    questionname: names[1],
    status: { $ne: "initial" }
  })
    .sort({ timesubmitted: "desc" })
    .exec(function(err, submissions) {
      if (err) return next(err);
      res.status(200).send(submissions);
    });
};

exports.submission_run = function(req, res, next) {
  SleepUtil.sleep();
  //sleep.sleep(3); //sleep for 3 seconds
  var newsubmit = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: "initial", // not submitted -> just created
    timeupdated: moment(new Date(Date.now())),
    timesubmitted: moment(new Date(Date.now())),
    runtime: 0
  });

  //console.log(newsubmit);

  Submission.findOne(
    {
      username: newsubmit.username,
      questionname: newsubmit.questionname,
      language: newsubmit.language,
      status: "initial"
    },
    function(err, submission) {
      if (err) {
        return next(err);
      }
      if (!submission) {
        // 1. Save the submission first
        newsubmit.save({ new: true }, function(err, newsubmit) {
          if (err) {
            return next(err);
          }
          // 3. Run
          run(req, res, next, newsubmit);
        });
      } else {
        // Update solution
        submission.solution = newsubmit.solution;
        submission.timeupdated = moment(new Date(Date.now()));
        Submission.findByIdAndUpdate(
          submission._id,
          { $set: submission },
          { new: true },
          function(err, submission) {
            if (err) return next(err);
            // 3. Run
            run(req, res, next, submission);
          }
        );
      }
    }
  );
};

function run(req, res, next, submission) {
  var start = moment(new Date(Date.now()));

  // 2. Then, run the solution to get the test result
  RunnerManager.run(
    submission.questionname,
    submission.language,
    submission.solution,
    function(status, message) {
      const result = {
        status,
        message
      };
      console.log(status);
      if (status == "pass" || status == "fail") {
        var end = moment(new Date(Date.now()));

        var ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(
          moment(start, "DD/MM/YYYY HH:mm:ss")
        );

        // 3. Find the submission
        Submission.findById(submission.id, function(err, submission) {
          // update status
          submission.status = status;
          submission.runtime = ms;
          submission.timesubmitted = moment(new Date(Date.now()));

          //console.log(submission);
          // 4. Update the submission
          submission.save(function(err) {
            if (err) return next(err);
            res.end(JSON.stringify(result));
          });
        });
      } else {
        res.end(JSON.stringify(result));
      }
    }
  );
}
