var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var sanitizeHtml = require("sanitize-html");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var FileStore = require("session-file-store")(session);
var configSession = require("./config/session.json");
var flash = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    // secure: true, htpps일때만
    HttpOnly: true,
    secret: configSession.secret,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: configSession.host,
      port: configSession.port,
      user: configSession.user,
      password: configSession.password,
      database: configSession.database
      // cookie: {
      //   secure: true,
      //   httpOnly: true
      // }
    })
  })
);

var passport = require("./lib/passport")(app);

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(flash());

app.use("/dist", express.static("./dist"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var indexRouter = require("./routes/index")(passport);
let authRouter = require("./routes/auth.js");
let brandRouter = require("./routes/brand");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/brand", brandRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.set("port", process.env.PORT || 3000); //80번 포트로 바꾸기

app.use(function(req, res, next) {
  res.end("Not Found");
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
