const express = require("express");
const router = express();

let user = {
  email: "jjuu6933@naver.com",
  id: "jjuu6933",
  password: "1",
  displayName: "lee"
};

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

router.get("/logout_process", (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});
module.exports = router;
