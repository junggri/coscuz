const express = require("express");
const router = express.Router();
const index = require("../lib/template/index");
const brandList = require("../lib/brandList");
const auth = require("../lib/login");
const db = require("../lib/lowdb");

module.exports = function() {
  router.get("/", function(req, res) {
    let authStatus = auth.status(req, res);
    let brand = db.get("brands").value();
    let desc = db.get("desc").value();
    var Lists = brandList.brand(brand, desc);
    var html = index.html(Lists, authStatus);
    // res.send(html);
    res.render("index.html");
  });
  return router;
};
