module.exports = function(app) {
  var passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    NaverStrategy = require("passport-naver").Strategy,
    KakaoStrategy = require("passport-kakao").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    // console.log("serializeUser", user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // console.log("deserializeUser", user);
    //시리얼라이즈의 user.id로 구분하고 디시리럴라이즈의 user값으로 구분된 값을 req.user에 집어넜는다
    done(null, user);
  });

  var googleAPI = require("../config/google.json");
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleAPI.web.client_id,
        clientSecret: googleAPI.web.client_secret,
        callbackURL: googleAPI.web.redirect_uris[0]
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(accessToken, refreshToken, profile);
        return done(null, profile);
      }
    )
  );
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    function(req, res) {
      req.session.save(function() {
        res.redirect("/");
      });
    }
  );

  var naverCre = require("../config/naver.json");

  passport.use(
    new NaverStrategy(
      {
        clientID: naverCre.clientID,
        clientSecret: naverCre.clientSecret,
        callbackURL: naverCre.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
  app.get("/auth/naver", passport.authenticate("naver"));

  app.get(
    "/auth/naver/callback",
    passport.authenticate("naver", { failureRedirect: "/auth/login" }),
    function(req, res) {
      req.session.save(function() {
        res.redirect("/");
      });
    }
  );
  var kakaoCre = require("../config/kakao.json");
  passport.use(
    new KakaoStrategy(
      {
        clientID: kakaoCre.clientID,
        callbackURL: kakaoCre.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
  app.get(
    "/auth/kakao",
    passport.authenticate("kakao", {
      successRedirect: "/",
      failureRedirect: "/auth/login"
    })
  );
  app.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { failureRedirect: "/auth/login" }),
    function(req, res) {
      req.session.save(function() {
        res.redirect("/");
      });
    }
  );
  return passport;
};
