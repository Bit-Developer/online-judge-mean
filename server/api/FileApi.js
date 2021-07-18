const fs = require("fs");
const getDirName = require("path").dirname;
const path = require("path");
const ncp = require("ncp").ncp;

ncp.limit = 16;

module.exports = {
  getFile(lang, callback) {
    let file = "";
    const language = lang.toLowerCase();
    if (language === "java") {
      file = path.join(__dirname, "../templates", "Hello.java");
    } else if (language === "c") {
      file = path.join(__dirname, "../templates", "Hello.c");
    } else if (language === "c++") {
      file = path.join(__dirname, "../templates", "Hello.cpp");
    } else if (language === "javascript") {
      file = path.join(__dirname, "../templates", "Hello.js");
    } else if (language === "python") {
      file = path.join(__dirname, "../templates", "Hello.py");
    } else {
      callback("");
      return;
    }
    console.log(`getTemplate:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },

  creatDirectory(path, callback) {
    if (!fs.existsSync(path)) {
      // create parent directories if they doesn't exist.
      fs.mkdir(path, { recursive: true }, err => {
        if (err) return callback(err);
        callback(
          null,
          "[Initialization]: Working direcotry is created in " + path
        );
      });
    } else {
      callback(null, "[Initialization]: Working direcotry exists in " + path);
    }
  },

  saveFile(file, content, callback) {
    // create parent directories if they doesn't exist.
    fs.mkdir(getDirName(file), { recursive: true }, err => {
      if (err) return callback(err);

      return fs.writeFile(file, content, err2 => {
        if (err2) {
          throw err2;
        }

        callback();
      });
    });
  },

  copyFile(source, target, callback) {
    var isCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
      done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
      done(err);
    });
    wr.on("close", function(ex) {
      done();
    });
    rd.pipe(wr);

    function done(err) {
      if (!isCalled) {
        callback(err);
        isCalled = true;
      }
    }
  },

  copyDirectory(source, target, callback) {
    // create target directory if it doesn't exist.
    console.log(source)
    console.log(target)
    fs.mkdir(target, { recursive: true }, err => {
      if (err) return callback(err);

      ncp(source, target, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    });
  },

  readFile(file, callback) {
    console.log("FileApi.readFile(), file:" + file);
    fs.readFile(file, function(err, data) {
      if (err) {
        console.log("FileApi.readFile(), err:" + err);
        throw err;
      }
      //console.log("FileApi.readFile(), data:" + data);
      callback(err, data + "");
    });
  }
};
