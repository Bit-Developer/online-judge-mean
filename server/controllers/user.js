const moment = require("moment");
const User = require("../models/user");
const ValidationError = require("../models/validationerror");
const Ctypto = require("../utils/").Ctypto;
const { check, validationResult } = require("express-validator/check");
const SleepUtil = require("../utils/").SleepUtil;

exports.user_create = function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.save({ new: true }, function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).send(user);
  });
};

exports.user_readone = function(req, res, next) {
  SleepUtil.sleep();
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).send(user);
  });
};

exports.user_update = function(req, res, next) {
  SleepUtil.sleep();
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(err, user) {
      if (err) return next(err);
      res.status(200).send(user);
    }
  );
};

exports.user_delete = function(req, res, next) {
  SleepUtil.sleep();
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return next(err);
    res.status(200).send(user);
  });
};

exports.user_all = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.status(200).send(users);
  });
};

exports.user_resetpwd = function(req, res, next) {
  SleepUtil.sleep();
  const id = req.body.id;
  User.findById(id, function(err, user) {
    if (!user) {
      var error = new ValidationError("body", "userid", id, "User not found!");
      res.status(422).json({ errors: [error] });
    } else {
      // set hash and salt
      user.setPassword("123456");

      console.log(user);
      user.save(function(err) {
        if (err) {
          var error = new ValidationError("body", "password", password, err);
          return res.status(422).json({ errors: [error] });
        }
        res.status(200).send(user);
      });
    }
  });
};

/*
exports.user_signup = function(req, res, next) {
  var newuser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({ username: newuser.username }, function(err, user) {
    if (user) {
      var error = new ValidationError(
        "body",
        "username",
        newuser.username,
        "User Name is existed!"
      );
      res.status(422).json({ errors: [error] });
    } else {
      User.findOne({ email: newuser.email }, function(err, user) {
        if (user) {
          var error = new ValidationError(
            "body",
            "username",
            newuser.email,
            "Email is existed!"
          );
          res.status(422).json({ errors: [error] });
        } else {
          Ctypto.saltAndHash(newuser.password, function(hash) {
            newuser.password = hash;
            // append date stamp when record was created //
            newuser.timecreated = moment(new Date(Date.now()));
            newuser.save({ new: true }, function(err, user) {
              if (err) {
                return next(err);
              }
              res.status(200).send(user);
            });
          });
        }
      });
    }
  });
};

exports.user_login = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  //sleep.sleep(3); //sleep for 3 seconds

  User.findOne({ username: username }, function(err, user) {
    if (user == null) {
      var error = new ValidationError(
        "body",
        "username",
        username,
        "User not found!"
      );
      res.status(422).json({ errors: [error] });
    } else {
      Ctypto.validatePassword(password, user.password, function(err, same) {
        if (same) {
          res.status(200).send(user);
        } else {
          var error = new ValidationError(
            "body",
            "password",
            password,
            "Invalid password!"
          );
          res.status(422).json({ errors: [error] });
        }
      });
    }
  });
};
*/
