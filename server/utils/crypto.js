const crypto = require("crypto");

var generateSalt = function() {
  var set = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
  var salt = "";
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
};

var md5 = function(str) {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
};

var saltAndHash = function(password, callback) {
  var salt = generateSalt();
  callback(salt + md5(password + salt));
};

var validatePassword = function(plainPass, hashedPass, callback) {
  var salt = hashedPass.substr(0, 10);
  var validHash = salt + md5(plainPass + salt);
  callback(null, hashedPass === validHash);
};

module.exports = {
  saltAndHash: saltAndHash,
  validatePassword: validatePassword
};
