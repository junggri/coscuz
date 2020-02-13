var express = require("express");
var router = express.Router();
var index = require("../lib/index");
var test = require("../lib/test");
var fs = require("fs");

module.exports = function(passport) {
  router.get("/", function(req, res) {
    fs.readdir("./public/image", function(err, data) {
      console.log(data);
      var Lists = test.brand(data);
      var html = index.html(Lists);
      res.send(html);
      // res.render("index.html");
    });
  });
  return router;
};
