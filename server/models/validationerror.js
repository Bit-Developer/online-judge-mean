//{"location":"body","param":"email","value":"jojozhuang","msg":"Email address is invalid"}
function ValidationError(location, param, value, msg) {
  var error = {};

  error.location = location;
  error.param = param;
  error.value = value;
  error.msg = msg;

  return error;
}

module.exports = ValidationError;
