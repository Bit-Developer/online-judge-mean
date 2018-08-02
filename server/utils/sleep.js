const sleepNode = require("sleep");
const config = require("../config/server-config");

const { app: { request_delay } } = config;

var sleep = function(seconds) {
  const delay = seconds || request_delay;
  if (delay && delay > 0) {
    console.log("sleep for seconds:", delay);
    sleepNode.sleep(delay);
  }
};

module.exports = {
  sleep: sleep
};
