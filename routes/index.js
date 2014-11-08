var jwt = require('jwt-simple');

var index = function(config) {
  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload: config.liveReload.enabled,
    optimize: config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };

  return function(req, res) {
    res.render("index", options);
  };
};

var iframe = function(config) {
  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload: config.liveReload.enabled,
    optimize: config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };

  return function(req, res) {
    res.render("iframe", options);
  };
};

var user = function(config) {
  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload: config.liveReload.enabled,
    optimize: config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };

  return function(req, res) {
    // console.log("rest user impl");
    if (req.user) {
      // var sessionInfo = {
      //   ip: req.ip,
      //   user: {
      //     id: req.user.id,
      //     provider: req.user.provider
      //   },
      //   issued: -1, // TODO
      //   expires: -1 // TODO
      // };
      // var sessionJwt = jwt.encode(sessionInfo, config.jwtSecret);
      // sessionInfo.session = sessionJwt;
      // sessionInfo.user = req.user;
      // console.log('routes/index.js sessionInfo:');
      // console.log(sessionInfo);
      // res.json(sessionInfo);
      res.json(req.user);
    }
    else {
      res.send(401);
    }
  };
};

var logout = function(config) {
  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload: config.liveReload.enabled,
    optimize: config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };

  return function(req, res) {
    req.logout();
    res.json({status: "OK"});
  };
};

exports.index = index;
exports.iframe = iframe;
exports.user = user;
exports.logout = logout;