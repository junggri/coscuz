var express = require("express");
var router = express.Router();

router.get("/login", function(req, res) {
  res.render("auth.html");
});

router.get("/logout", function(request, response) {
  request.logout();
  request.session.destroy(function() {
    response.redirect("/");
  });
});

module.exports = router;
