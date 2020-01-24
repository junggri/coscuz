var express = require("express");
var router = express.Router();
var index = require("../lib/index");
var auth = require("../lib/auth");

module.exports = function(passport) {
  router.get("/", function(req, res) {
    var html = index.html(auth.StatusUI(req, res));
    //res.send(html);
    res.render("index.html");
  });
  return router;
};
