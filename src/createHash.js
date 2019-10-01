const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}

console.log(hashPassword(process.argv[2]));
// instead of logging the hashed password, save it in a file. don't forget to gitignore this file.
