const crypto = require("crypto");
const fs = require("fs");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}

const hashedPassword = hashPassword(process.argv[2]);
fs.writeFileSync(".password", hashedPassword);
