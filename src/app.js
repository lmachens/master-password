const readline = require("readline");
const crypto = require("crypto");

const { executeCommand } = require("./lib/commands");
const { readPassword } = require("./lib/secrets");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash = readPassword();

rl.question("What is the master password? ", password => {
  rl.output.write("\n");
  if (verifyHash(password, masterPasswordHash)) {
    executeCommand(password, action, key, value);
  } else {
    console.log("Invalid master password!");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
}
