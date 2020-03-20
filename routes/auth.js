const express = require("express");
const router = express();
let DB = require("../lib/mysql");
let bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.use(bodyParser.text({ type: "text/plain" })); // use this instead

router.get("/login", function(req, res) {
  res.render("auth.html");
});

router.post("/login_process", function(req, res) {
  if (req.body.id === user.id && req.body.pwd === user.password) {
    req.session.logined = true;
    req.session.displayName = user.displayName;
    res.redirect("/");
  } else {
    res.send("tlfvo");
  }
});

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.post("/register_process", (req, res) => {
  crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString("base64");
    crypto.pbkdf2(req.body.pwd1, salt, 100000, 64, "sha512", (err, key) => {
      console.log(key.toString("base64"));
      DB.query(
        `INSERT INTO user_info (id,password,email,brandName,name,detailAddress,roadAddress,postcode) VALUES (?,?,?,?,?,?,?,?)`,
        [
          req.body.id,
          key.toString("base64"),
          req.body.email,
          req.body.brandName,
          req.body.name,
          req.body.detailAddress,
          req.body.roadAddress,
          req.body.postcode
        ],
        function(err) {
          if (err) throw err;
        }
      );
      DB.query(
        `INSERT INTO saltValue (id,salt) VALUES (?,?)`,
        [req.body.id, salt],
        function(err) {
          if (err) throw err;
        }
      );
    });
  });
  res.redirect("/");
});

router.get("/logout_process", (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

router.post("/user", (req, res) => {
  DB.query(`select * from user_info where id=?`, [req.body.id], (err, data) => {
    let responseData = null;
    if (data.length === 0) {
      responseData = { state: "", canEnrollment: true };
    } else {
      responseData = { state: "이용중인 아이디입니다.", canEnrollment: false };
    }
    res.json(responseData);
  });
});

router.post("/nodemailerTest", (req, res) => {
  let timerArray = [];
  for (let i = 0; i < 6; i++) {
    let randomNum = Math.floor(Math.random() * 10);
    timerArray.push(randomNum);
  }
  DB.query(
    `select * from user_info where email=?`,
    [req.body.email],
    (err, data) => {
      let responseData = null;
      if (data.length === 0) {
        responseData = {
          state: "사용가능한 이메일입니다.",
          canEnrollment: true,
          validation_num: timerArray.join("")
        };
      } else {
        responseData = {
          state: "이용중인 이메일입니다.",
          canEnrollment: false
        };
      }
      res.json(responseData);
    }
  );
  let transpoter = nodemailer.createTransport({
    service: "naver",
    auth: {
      user: "coscuz@naver.com",
      pass: "dlwjdtn12"
    }
  });
  let mailOption = {
    from: "coscuz@naver.com",
    to: req.body.email,
    subject: "인증을 위한 메일입니다.",
    html: `<h1>인증번호는 ${timerArray.join("")} 입니다.</h1>`
  };
  transpoter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.respose);
    }
  });
});

module.exports = router;
