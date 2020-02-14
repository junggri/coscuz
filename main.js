var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var session = require("express-session");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var sanitizeHtml = require("sanitize-html");
// var MySQLStore = require("express-mysql-session")(session);
// var configSession = require("./config/session.json");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: configSession.secret,
//     resave: false,
//     saveUninitialized: true,
//     store: new MySQLStore({
//       host: configSession.host,
//       port: configSession.port,
//       user: configSession.user,
//       password: configSession.password,
//       database: configSession.database
//       cookie: {
//         secure: true,
//         httpOnly: true
//       }
//     })
//   })
// );

var passport = require("./lib/passport")(app);

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var indexRouter = require("./routes/index")(passport);

app.use("/", indexRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.set("port", process.env.PORT || 3000); //80번 포트로 바꾸기

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

var server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});

module.exports = app;
