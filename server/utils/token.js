const jwtDecode = require("jwt-decode");

var decodeToken = function(token) {
  const userDetails = jwtDecode(token);
  return userDetails;
};

module.exports = {
  decodeToken: decodeToken
};
