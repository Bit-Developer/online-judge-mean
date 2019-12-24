//const sleepNode = require("sleep");
const config = require("../config/server-config");

const { app: { request_delay } } = config;

var sleep = function(seconds) {
  const delay = seconds || request_delay;
  if (delay && delay > 0) {
    console.log("sleep for seconds:", delay);
    //sleepNode.sleep(delay);
    msleep(delay * 1000);
  }
};

var msleep = function(miliseconds) {
  //https://www.npmjs.com/package/sleep
  //When using nodejs 9.3 or higher it's better to use Atomics.wait which doesn't require compiling this C++ module. 
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, miliseconds);
}

module.exports = {
  sleep: sleep
};
