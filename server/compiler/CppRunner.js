const { spawn } = require('child_process');
const Runner = require('./Runner');
const path = require('path');

class CppRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.cpp';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.cpp') {
      console.log(`${file} is not a cpp file.`);
      return;
    }
    this.compile(file, directory, filename, callback);
  }

  // compile a c file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    // ['codec.c', '-o','codec.out']
    const argsCompile = [];
    argsCompile[0] = file;
    argsCompile[1] = '-o';
    argsCompile[2] = path.join(directory, `${filename}.out`);
    console.log(`argsCompile:${argsCompile}`);

    // const compile = spawn('g++', ['Hello.cpp', '-o','Hello.out']);
    const compiler = spawn('g++', argsCompile);
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback('1', String(data)); // 1, compile error
    });
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, callback);
      }
    });
  }

  // execute the compiled file
  execute(directory, filename, options, callback) {
    const cmdRun = path.join(directory, `${filename}.out`);

    // const executor = spawn('./Hello.out', [], options);
    const executor = spawn(cmdRun, [], options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
