const express = require("express");
const router = express();
let DB = require("../lib/mysql");
let bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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

// router.post("/register_process", (req, res) => {
//   res.send("ji");
// });

router.get("/logout_process", (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

router.post("/user", (req, res) => {
  DB.query(`select * from user_info where id=?`, [req.body.id], (err, data) => {
    let responseData = null;
    if (data.length === 0) {
      responseData = { state: "사용가능한 아이디입니다.", canEnrollment: true };
    } else {
      responseData = { state: "이용중인 아이디입니다.", canEnrollment: false };
    }
    res.json(responseData);
  });
});
router.post("/nodemailerTest", (req, res) => {
  // let responseData = req.body.email;
  // let transpoter = nodemailer.createTransport({
  //   service: "naver",
  //   auth: {
  //     user: "coscuz@naver.com",
  //     pass: "dlwjdtn12"
  //   }
  // });
  // let mailOption = {
  //   from: "coscuz@naver.com",
  //   to: "jjuu6933@naver.com",
  //   subject: "test",
  //   text: `인증번호 입력란에 입력해주세요`
  // };
  // transpoter.sendMail(mailOption, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(info.respose);
  //   }
  // });
  // res.json(responseData);
});
module.exports = router;
