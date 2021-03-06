const express = require("express");
const router = express();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
let DB = require("../lib/mysql");
let bodyParser = require("body-parser");
let registerUser = require("../lib/template/registerUser");
let loginTemplate = require("../lib/template/login");

router.use(bodyParser.text({ type: "text/plain" })); // use this instead

router.get("/login", function (req, res) {
  res.render("login.html");
});

router.post("/login_process", function (req, res, next) {
  req.flash("msg", "로그인정보가 일치하지 않습니다.");
  let msg = req.flash("msg");
  let html = loginTemplate.html(msg);
  DB.query(
    `SELECT * FROM brand_info JOIN saltvalue on brand_info.id = saltvalue.id where brand_info.id = ?`,
    [req.body.saveId],
    (err, data) => {
      if (err) next(err);
      if (data.length === 0) {
        res.send(html);
        return;
      }
      crypto.pbkdf2(
        req.body.pwd,
        data[0].salt,
        100000,
        64,
        "sha512",
        (err, key) => {
          if (
            data[0].id === req.body.saveId &&
            key.toString("base64") === data[0].password
          ) {
            req.session.save(() => {
              req.session.logined = true;
              res.redirect("/");
            });
          } else {
            res.send(html);
            return;
          }
        }
      );
    }
  );
});

router.get("/register_previous", (req, res) => {
  res.render("previous.html");
});

router.get("/register_brand", (req, res) => {
  res.render("registerBrand.html");
});

router.get("/register_user", (req, res) => {
  let id = req.user.id;
  let email;
  let name;
  let oauth = req.user._json;
  if (req.user.provider === "naver") {
    email = oauth.email;
    name = "";
  } else if (req.user.provider === "google") {
    email = oauth.email;
    name = oauth.name;
  } else if (req.user.provider === "kakao") {
    email = oauth.kakao_account.email;
    name = oauth.kakao_account.profile.nickname;
  }
  let html = registerUser.html(email, name, id);
  res.send(html);
  // res.render("registerUser.html");
});

router.post("/register_user_process", (req, res, next) => {
  DB.query(
    `INSERT INTO user_info (oauth_email,oauth_name,oauth_id) VALUES (?,?,?) `,
    [req.body.email, req.body.name, req.body.id],
    function (err) {
      req.session.save(() => {
        req.session.logined = true;
        res.redirect("/");
      });
      if (err) next(err);
    }
  );
});

router.post("/register_brand_process", (req, res) => {
  crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString("base64");
    crypto.pbkdf2(req.body.pwd1, salt, 100000, 64, "sha512", (err, key) => {
      DB.query(
        `INSERT INTO brand_info (id,password,email,brandName,name,detailAddress,roadAddress,postcode) VALUES (?,?,?,?,?,?,?,?)`,
        [
          req.body.id,
          key.toString("base64"),
          req.body.email,
          req.body.brandName,
          req.body.name,
          req.body.detailAddress,
          req.body.roadAddress,
          req.body.postcode,
        ],
        function (err) {
          if (err) throw err;
        }
      );
      DB.query(
        `INSERT INTO saltvalue (id,salt) VALUES (?,?)`,
        [req.body.id, salt],
        function (err) {
          if (err) throw err;
        }
      );
    });
  });
  res.redirect("/");
});

router.get("/logout_process", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

router.get("/account", (req, res) => {
  res.render("account.html");
});

// bleow ajax calling

router.post("/userId", (req, res) => {
  DB.query(
    `select * from brand_info where id=?`,
    [req.body.id],
    (err, data) => {
      let responseData = null;
      if (data.length === 0) {
        responseData = { state: "", canEnrollment: true };
      } else {
        responseData = {
          state: "이용중인 아이디입니다.",
          canEnrollment: false,
        };
      }
      res.json(responseData);
    }
  );
});

router.post("/nodemailerTest", (req, res) => {
  let randomArray = [];
  for (let i = 0; i < 6; i++) {
    let randomNum = Math.floor(Math.random() * 10);
    randomArray.push(randomNum);
  }
  DB.query(
    `select * from brand_info where email=?`,
    [req.body.email],
    (err, data) => {
      if (data.length === 0) {
        responseData = {
          state: "사용가능한 이메일입니다.",
          canEnrollment: true,
          validation_num: randomArray.join(""),
        };
        let transpoter = nodemailer.createTransport({
          service: "naver",
          auth: {
            user: "coscuz@naver.com",
            pass: "dlwjdtn12",
          },
        });
        let mailOption = {
          from: "coscuz@naver.com",
          to: req.body.email,
          subject: "인증을 위한 메일입니다.",
          html: `<h1>인증번호는 ${randomArray.join("")} 입니다.</h1>`,
        };
        transpoter.sendMail(mailOption, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info.respose);
          }
        });
      } else {
        responseData = {
          state: "이용중인 이메일입니다.",
          canEnrollment: false,
        };
      }
      res.json(responseData);
    }
  );
});
module.exports = router;
