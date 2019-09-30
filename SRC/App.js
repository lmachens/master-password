const readline = require("readline");
const {
  executeCommand
} = require("/Users/joseteran/neuefische/master-password/src/lib/comands.js");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPassword = "lalunera";
rl.question("What is the master password? ", password => {
  rl.output.write("\n");
  if (password === masterPassword) {
    executeCommand(action, key, value);
  } else {
    console.log("Invalid master password!");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};
