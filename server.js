var express = require('express');
var engines = require('consolidate');
var passport = require('passport');

var routes = require('./routes');
var restinterface = require('./restinterface');
var auth = require('./auth');
var conf = require('./config');

exports.startServer = function(config, callback) {
  var config = conf.initialize(config);
  var app = express();

  app.configure(function() {
    app.set('port', config.server.port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
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
  app.get('/iframe', routes.iframe(config));
  app.get('/rest/user', auth.authenticate, routes.user(config));
  app.get('/rest/user/logout', routes.logout(config));

  auth.initialize(config, app);
  restinterface.initialize(config, app);

  var server = app.listen(config.server.port, function() {
    console.log('im-accounts listening at %s', config.server.port);
  });

  callback(server);
};