const { spawn } = require("child_process");
const Runner = require("./Runner");

class JavaScriptRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.js";
    this.testfile = "SolutionTester.js";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".js") {
      console.log(`${file} is not a javascript file.`);
    }

    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);

    // node SolutionTester.js 1 0 -1 -1
    const executor = spawn("node", argsRun, options);
    executor.stdout.on("data", output => {
      const out = String(output);
      //console.log(`javaRunner->execute(): stdout:`);
      console.log(output);
      if (out.startsWith("[Success]") || out.startsWith("[Fail]")) {
        callback("ok", String(output)); // ok, no error
      }
    });
    executor.stderr.on("data", output => {
      console.log(`stderr: ${String(output)}`);
      callback("err_exe", String(output)); // err, execution failure
    });
    executor.on("close", output => {
      console.log(`stdout: ${output}`);
    });
  }
}

module.exports = JavaScriptRunner;
