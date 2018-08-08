var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var config = require("../config/server-config");

const { app: { secret } } = config;

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, max: 20 },
  email: { type: String, required: true, max: 100 },
  role: {
    type: String,
    enum: ["admin", "regular"],
    default: "regular"
  },
  hash: String,
  salt: String,
  timecreated: { type: Date, default: Date.now }
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.validRole = function() {
  //console.log("role:", this.role);
  return this.role === "admin";
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // expired after 7 days

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      hash: this.hash, // include hash in token for 'remember me' function.
      exp: parseInt(expiry.getTime() / 1000)
    },
    secret
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// Export the model
module.exports = mongoose.model("User", UserSchema);
