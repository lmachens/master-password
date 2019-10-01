const fs = require("fs");

const fileName = "secrets.json";
const passwordFileName = "password.json";

function readSecrets() {
  try {
    const secretsJSON = fs.readFileSync(fileName, "utf-8");
    const secrets = JSON.parse(secretsJSON);
    return secrets;
  } catch (error) {
    writeSecrets({});
    return {};
  }
}
function writeSecrets(secrets) {
  fs.writeFileSync(fileName, JSON.stringify(secrets));
}
function readPassword() {
  try {
    const passwordJSON = fs.readFileSync(passwordFileName, "utf-8");
    const passsword = JSON.parse(passwordJSON);
    return passsword;
  } catch (error) {
    throw new Error("Call node 'src/createHash.js YOUR_PASSWORD' first");
  }
}
function writePassword(passsword) {
  fs.writeFileSync(passwordFileName, JSON.stringify(passsword));
}

exports.readSecrets = readSecrets;
exports.writeSecrets = writeSecrets;

exports.readPassword = readPassword;
exports.writePassword = writePassword;
