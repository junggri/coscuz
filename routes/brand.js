const express = require("express");
const router = express();

router.get("/:barndId", function(req, res) {
  // res.send(req.params.barndId);

  res.render("brand.html");
});

module.exports = router;
