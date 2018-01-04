const { domain, clientID, clientSecret } = require("./config.js");
const Auth0Strategy = require("passport-auth0");

module.exports = new Auth0Strategy(
  {
    domain,
    clientID,
    clientSecret,
    callbackURL: "./login",
    scope: "openid profile user"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
