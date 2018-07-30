const sleepNode = require("sleep");
const config = require("../config/server-config");

var sleep = function(seconds) {
  const delay = seconds || config.request_delay;
  if (delay && delay > 0) {
    sleepNode.sleep(delay);
  }
};

module.exports = {
  sleep: sleep
};
