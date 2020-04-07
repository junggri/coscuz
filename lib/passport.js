module.exports = function (app) {
  var passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    NaverStrategy = require("passport-naver").Strategy,
    KakaoStrategy = require("passport-kakao").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy;

  let DB = require("../lib/mysql");
  let bodyParser = require("body-parser");

  app.use(passport.initialize());
  app.use(passport.session());

  var kakaoCre = require("../config/kakao.json");
  var googleAPI = require("../config/google.json");
  var naverCre = require("../config/naver.json");

  passport.serializeUser(function (user, done) {
    // console.log("serializeUser", user);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    // console.log("deserializeUser", user);
    //시리얼라이즈의 user.id로 구분하고 디시리럴라이즈의 user값으로 구분된 값을 req.user에 집어넜는다
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleAPI.web.client_id,
        clientSecret: googleAPI.web.client_secret,
        callbackURL: googleAPI.web.redirect_uris[0],
      },
      function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken, refreshToken, profile);
        return done(null, profile);
      }
    )
  );
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
    }),
    function (req, res) {
      req.session.save(function () {
        DB.query(
          "select * from user_info where oauth_id=?",
          [req.session.passport.user.id],
          (err, data) => {
            if (err) throw err;
            if (data.length === 0) {
              res.redirect("/auth/register_user");
            } else {
              req.session.save(function () {
                req.session.logined = true;
                res.redirect("/");
              });
            }
          }
        );
      });
    }
  );

  passport.use(
    new NaverStrategy(
      {
        clientID: naverCre.clientID,
        clientSecret: naverCre.clientSecret,
        callbackURL: naverCre.callbackURL,
        authType: "reauthenticate",
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);
      }
    )
  );

  app.get("/auth/naver", passport.authenticate("naver"));

  app.get(
    "/auth/naver/callback",
    passport.authenticate("naver", {
      failureRedirect: "/auth/login",
    }),
    function (req, res) {
      DB.query(
        "select * from user_info where oauth_id=?",
        [req.session.passport.user.id],
        (err, data) => {
          if (err) throw err;
          if (data.length === 0) {
            res.redirect("/auth/register_user");
          } else {
            req.session.save(function () {
              req.session.logined = true;
              res.redirect("/");
            });
          }
        }
      );
    }
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: kakaoCre.clientID,
        callbackURL: kakaoCre.callbackURL,
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
  app.get(
    "/auth/kakao",
    passport.authenticate("kakao", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
    })
  );
  app.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { failureRedirect: "/auth/login" }),
    function (req, res) {
      DB.query(
        "select * from user_info where oauth_id=?",
        [req.session.passport.user.id],
        (err, data) => {
          if (err) throw err;
          if (data.length === 0) {
            res.redirect("/auth/register_user");
          } else {
            req.session.save(function () {
              req.session.logined = true;
              res.redirect("/");
            });
          }
        }
      );
    }
  );
  return passport;
};
