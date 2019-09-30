const { readSecrets, writeSecrets } = require("./secrets");

function set(key, value) {
  const secrets = readSecrets();
  secrets[key] = value;
  writeSecrets(secrets);
}

function unset(key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

function get(key) {
  const secrets = readSecrets();
  const secret = secrets[key];
  console.log(secret);
}

const commands = {
  set,
  get,
  unset
};

exports.executeCommand = function executeCommand(action, key, value) {
  const command = commands[action];
  if (!command) {
    throw new Error("unknown action");
  }
  command(key, value);
};
