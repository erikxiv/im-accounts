var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jwt-simple');
var accessTokens = {};
var sessionTokens = {};

exports.authenticate = function(req, res, next) {
  var profile = sessionTokens[req.query.st];
  // console.log("auth authenticate: " + (profile != null) + ' st='+req.query.st);
  if (!profile)
    return res.send(401);
  req.user = profile;
  next();
};

exports.initialize = function(config, app) {
  passport.use('google', new GoogleStrategy({
      clientID: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log("ACC-AUTH token: a="+accessToken);
      // console.log(JSON.stringify(profile));
      accessTokens[accessToken] = profile;
      return done(null, profile, accessToken);
    }
  ));

  // passport.serializeUser(function(user, done) {
  //   console.log('serializeUser?');
  //   done(null, user);
  // });

  // passport.deserializeUser(function(user, done) {
  //   done(null, user);
  // });

  // Redirect the user to the OAuth 2.0 provider for authentication.  When
  // complete, the provider will redirect the user back to the application at
  //     /auth/provider/callback
  app.get('/auth/google', function(req, res) {
    // console.log("ACC-LOGIN: redirect="+req.query.redirect);
    passport.authenticate('google', { scope: ['email', 'profile'], state: req.query.redirect })(req,res);
  });

  // The OAuth 2.0 provider has redirected the user back to the application.
  // Finish the authentication process by attempting to obtain an access
  // token.  If authorization was granted, the user will be logged in.
  // Otherwise, authentication has failed.
  app.get('/auth/google/callback', function(req, res, next) {
    // console.log("ACC-AUTH callback: state=" + req.query.state);
    // console.log(req.query);
    passport.authenticate('google', function(err, user, info) {
      // console.log("ACC-AUTH cb cb: a="+info);
      // TODO: Forward login failed message to origin web
      if (err || !user)
        return res.redirect(req.query.state+'?error=true');
      return res.redirect(req.query.state+'?code='+info);
    })(req,res);
  });

  app.get('/auth/token', function(req, res, next) {
    // console.log("ACC-TOKEN: " + req.query.code);
    var profile = accessTokens[req.query.code];
    if (!profile)
      return res.send(401);
    delete accessTokens[req.query.code];
    // console.log("ACC-TOKEN: " + profile.displayName);
    // Return sessionToken and profile in one swoop
    // TODO: Add start/end-time for token
    var sessionToken = jwt.encode({ id: profile.id, provider: profile.provider }, config.jwtSecret);
    sessionTokens[sessionToken] = profile;
    res.json({
      sessionToken: sessionToken,
      profile: profile
    });
  });

  return passport;
};