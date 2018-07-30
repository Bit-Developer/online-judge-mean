const { spawn } = require("child_process");
const Runner = require("./Runner");
const exec = require("child_process").exec;

class JavaRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.java";
    this.testfile = "SolutionTester.java";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".java") {
      console.log(`${file} is not a java file.`);
    }
    this.compile(file, directory, filename, callback);
  }

  // compile java source file
  runtest(file, directory, filename, callback) {
    /*
    var yourscript = exec(
      "sh " + file,
      { shell: true },
      (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
          callback("15", String(error)); // 15, error
        } else {
          callback("0", "Success");
        }
      }
    );*/

    const argsCompile = [];
    argsCompile[0] = file;
    const runner = spawn("sh", argsCompile, { shell: true });
    runner.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
      callback("ok", String(data)); // 0, no error
    });
    runner.stderr.on("data", data => {
      console.log(`compile-stderr: ${String(data)}`);
      callback("err", String(data)); // 1, error
    });
    runner.on("close", data => {
      this.log(`close: ${data}`);
    });
  }

  // compile java source file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const options2 = { classpath: directory };
    // var compiler = spawn('javac', ['CodeJava.java']);
    const argsCompile = [];
    //argsCompile[0] = "-sourcepath";
    //argsCompile[1] = directory;
    //argsCompile[2] = file;
    argsCompile[0] = directory + "/ParserUtil.java";
    argsCompile[1] = directory + "/Solution.java";
    argsCompile[2] = file;
    console.log(argsCompile);
    const compiler = spawn("javac", argsCompile, options2);
    compiler.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on("data", data => {
      console.log(`compile-stderr: ${String(data)}`);
      callback("err_cmp", String(data)); // 1, compile error
    });
    compiler.on("close", data => {
      if (data === 0) {
        this.execute(filename, options, callback);
      }
    });
  }

  // execute the compiled class file
  execute(filename, options, callback) {
    const argsRun = [];
    argsRun[0] = filename;
    const executor = spawn("java", argsRun, options);
    executor.stdout.on("data", output => {
      const out = String(output);
      console.log(`javaRunner->execute(): stdout:`);
      console.log(output);
      if (out.startsWith("[Success]") || out.startsWith("[Fail]")) {
        callback("ok", String(output)); // 0, no error
      }
    });
    executor.stderr.on("data", output => {
      console.log(`javaRunner->execute(): stderr: ${String(output)}`);
      callback("err_exe", String(output)); // 2, execution failure
    });
    executor.on("close", output => {
      this.log(`javaRunner->execute(): close: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaRunner;
