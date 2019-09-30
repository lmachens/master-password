const { readSecrets, writeSecrets } = require("./models/secrets");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

function set(key, value) {
  const secrets = readSecrets();
  secrets[key] = value;
  writeSecrets(secrets);
}

function unset(key) {
  console.log("unset", key);
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

const command = commands[action];
if (!command) {
  throw new Error("unknown action");
}
command(key, value);
