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
    if (req.user) {
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
exports.user = user;
exports.logout = logout;