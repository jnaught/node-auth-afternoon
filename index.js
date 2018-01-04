const express = require("express");
const session = require("express-session");
const passport = require("passport");
const request = require("request");
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
app.use(
  session({
    secret: "SuperSecretSecretSuper",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/followers",
    failureRedirect: "/login"
  })
);

app.get("/followers", (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    request(
      `https://api.github.com/users/${req.user.nickname}/followers`,
      {
        headers: {
          "User-Agent": req.user.nickname
        }
      },
      (error, response, body) => {
        res.status(200).send(body);
      }
    );
  } else {
    res.redirect("/login");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
