const path = require("path");
const FileApi = require("../api/FileApi");
const CRunner = require("./CRunner");
const CppRunner = require("./CppRunner");
const JavaRunner = require("./JavaRunner");
const JavaScriptRunner = require("./JavaScriptRunner");
const PythonRunner = require("./PythonRunner");
const appRoot = require("app-root-path");
const moment = require("moment");
const os = require("os");

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === "c") {
      runner = new CRunner();
    } else if (lang === "c++") {
      runner = new CppRunner();
    } else if (lang === "java") {
      runner = new JavaRunner();
    } else if (lang === "javascript") {
      runner = new JavaScriptRunner();
    } else if (lang === "python") {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(question, lang, solution, callback) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    // copy all files in the question folder from solution folder
    const sourceDir = path.resolve(
      `${appRoot}`,
      "server",
      "solution",
      question
    );
    const targetDir = path.resolve(
      `${appRoot}`,
      "server",
      "judgingengine",
      "temp",
      question + "_" + lang + "_" + moment().toISOString() // 2013-02-04T22:44:30.652Z
    );

    // copy source code files
    FileApi.copyDirectory(path.join(sourceDir, lang), targetDir, err => {
      if (err) {
        callback("99", String(err)); // 99, system error
      }

      const testcaseFile = path.join(targetDir, "testcase.txt");
      // copy test case file
      FileApi.copyFile(
        path.join(sourceDir, "testcase.txt"),
        testcaseFile,
        err => {
          if (err) {
            callback("99", String(err)); // 99, system error
          }
          // save the solution to Solution.java
          const sourceFile = path.resolve(targetDir, runner.sourceFile());
          //console.log(`source file: ${sourceFile}`);
          const filename = path.parse(sourceFile).name; // main
          const extension = path.parse(sourceFile).ext; // .java
          //console.log(`filename: ${filename}`);
          //console.log(`extension: ${extension}`);

          if (lang == "javascript") {
            // get method name and export it
            const method = solution
              .substring(solution.indexOf("var") + 4, solution.indexOf("="))
              .trim();
            solution = solution + " " + "module.exports = " + method + ";";
            //solution = solution + os.EOL + " module.exports = reverseString;";
          }
          FileApi.saveFile(sourceFile, solution, () => {
            const testFile = path.resolve(targetDir, runner.testFile());
            const testFileName = path.parse(testFile).name; // main
            runner.run(testFile, targetDir, testFileName, extension, function(
              status,
              message
            ) {
              if (status == "ok") {
                // no error
                console.log("message");
                console.log(message);
                if (message.startsWith("[Success]")) {
                  callback("pass", message.slice(9)); // ok, pass
                } else {
                  callback("fail", message.slice(6)); // ok, fail
                }
              } else {
                callback(status, message);
              }
            });
          });
        }
      );
    });
  }
};
