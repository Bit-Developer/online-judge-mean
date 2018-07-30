const ValidationError = require("../models/validationerror");

var buildError = function(message) {
  var error = new ValidationError("location", "param", "value", message);
  return error;
};

module.exports = {
  buildError: buildError
};
