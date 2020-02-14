var express = require("express");
var router = express.Router();
var index = require("../lib/index");
var brandList = require("../lib/brandList");
var fs = require("fs");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports = function() {
  router.get("/", function(req, res) {
    fs.readdir("./public/image/brand", function(err, data) {
      fs.readFile("./data/desc.txt", "utf8", function(err, desc) {
        if (err) throw err;
        let brand = ["a", "b", "c", "d", "e", "f"];
        var Lists = brandList.brand(brand, desc);
        var html = index.html(Lists);
        res.send(html);
        // res.render("index.html");
      });
    });
  });
  return router;
};
