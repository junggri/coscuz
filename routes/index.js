var express = require("express");
var router = express.Router();
var index = require("../lib/index");
var brandList = require("../lib/brandList");
var fs = require("fs");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// fs.readdir("./public/image/brand", function(err, data) 경로떄문에 복사 해둠
module.exports = function() {
  router.get("/", function(req, res) {
    let brand = db.get("brands").value();
    let desc = db.get("desc").value();
    var Lists = brandList.brand(brand, desc);
    var html = index.html(Lists);
    res.send(html);
    // res.render("index.html");
  });
  return router;
};
