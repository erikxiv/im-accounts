var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.initialize = function(config, app) {
  passport.use('google', new GoogleStrategy({
      clientID: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(JSON.stringify(profile));
      return done(null, profile, { message: 'Yeay.' });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Redirect the user to the OAuth 2.0 provider for authentication.  When
  // complete, the provider will redirect the user back to the application at
  //     /auth/provider/callback
  app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

  // The OAuth 2.0 provider has redirected the user back to the application.
  // Finish the authentication process by attempting to obtain an access
  // token.  If authorization was granted, the user will be logged in.
  // Otherwise, authentication has failed.
  app.get('/auth/google/callback', 
    passport.authenticate('google', { successRedirect: '/',
                                        failureRedirect: '/login' }));

  return passport;
};