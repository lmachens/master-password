const crypto = require("crypto");
const { writePassword } = require("./lib/secrets");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}

writePassword(hashPassword(process.argv[2]));
