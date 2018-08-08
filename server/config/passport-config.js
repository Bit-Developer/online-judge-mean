var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportJwt = require("passport-jwt");
var JWTStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var mongoose = require("mongoose");
var User = mongoose.model("User");
var config = require("./server-config");

const { app: { secret } } = config;

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, "User not found");
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, "Password is not match");
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      secretOrKey: secret
    },
    function(jwtPayload, done) {
      console.log("jwtPayload:", jwtPayload);

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      User.findOne({ username: jwtPayload.username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, "User not found");
        }
        //console.log("user:", user);
        // Return if password is wrong
        if (!user.hash === jwtPayload.hash) {
          return done(null, false, "Password is not match");
        }
        if (!user.validRole()) {
          return done(null, false, "No authorization");
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
