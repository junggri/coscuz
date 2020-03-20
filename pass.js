const crypto = require("crypto");
const db = require("./lib/lowdb");
const password = "wowwjd123";
// 회원가입할떄
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
    console.log(key.toString("base64"));
  });
});

// 로그인할떄
let slatValue = db.get("salt").value();
let passwordValue = db.get("password").value();

crypto.pbkdf2(password, slatValue[0], 100000, 64, "sha512", (err, key) => {
  console.log(key.toString("base64") === passwordValue[0]);
});
