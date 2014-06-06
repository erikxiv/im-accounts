var express = require('express'),
    routes = require('./routes'),
    engines = require('consolidate'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.startServer = function(config, callback) {
  passport.use('google_oauth2', new GoogleStrategy({
      clientID: '894804733486-88sokr24mclq90ld4emhiesk1adhnaro.apps.googleusercontent.com',
      clientSecret: 'rbGaQbepGzfkNJeOu81g09bR',
      callbackURL: process.env.AUTH_GOOGLE_CALLBACK || 'http://localhost:3000/auth/google_oauth2/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile, { message: 'Yeay.' });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  var port = process.env.PORT || config.server.port;
  var app = express();
  var server = app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.configure(function() {
    app.set('port', port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'huihqfecacnlkje' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(config.server.base, app.router);
    app.use(express.static(config.watch.compiledDir));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  app.get('/', routes.index(config));
  app.get('/rest/user', routes.user(config));
  app.get('/rest/user/logout', routes.logout(config));

  // Redirect the user to the OAuth 2.0 provider for authentication.  When
  // complete, the provider will redirect the user back to the application at
  //     /auth/provider/callback
  app.get('/auth/google_oauth2', passport.authenticate('google_oauth2', { scope: ['email', 'profile'] }));

  // The OAuth 2.0 provider has redirected the user back to the application.
  // Finish the authentication process by attempting to obtain an access
  // token.  If authorization was granted, the user will be logged in.
  // Otherwise, authentication has failed.
  app.get('/auth/google_oauth2/callback', 
    passport.authenticate('google_oauth2', { successRedirect: '/',
                                        failureRedirect: '/login' }));

  callback(server);
};