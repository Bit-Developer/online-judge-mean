var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator/check");

var authentication_controller = require("../controllers/authentication");
//var user_controller = require("../controllers/user");

router.post(
  "/signup",
  [
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 chars long"),
    // check password
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    // check email
    check("email")
      .isEmail()
      .withMessage("Email address is invalid")
  ],
  authentication_controller.signup
);

// auto login, remember me function
router.post("/autologin", authentication_controller.autologin);

// manual login
router.post(
  "/login",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("User name can't be empty"),
    // check password
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can't be empty")
  ],
  authentication_controller.login
);

// logout
router.post("/logout", authentication_controller.logout);

router.post(
  "/update",
  [
    // check _id
    check("_id")
      .not()
      .isEmpty()
      .withMessage("User Id is empty"),
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 chars long"),
    // check email
    check("email")
      .isEmail()
      .withMessage("Email address is invalid")
  ],
  authentication_controller.update
);

router.post(
  "/resetpwd",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("User name can't be empty"),
    // check current password
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can't be empty"),
    // check new password
    check("newpwd")
      .not()
      .isEmpty()
      .withMessage("New password can't be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    // check confirm password
    check("confirmpwd")
      .not()
      .isEmpty()
      .withMessage("Confirm password can't be empty"),
    // check confirm password
    check("confirmpwd").custom((value, { req }) => {
      if (value !== req.body.newpwd) {
        throw new Error("Confirm password is not same with new password");
      }
      return true;
    })
  ],
  authentication_controller.resetpwd
);

module.exports = router;
