//---------------------------------------------------------------------------
// REST Interface
// Provides the interface towards accounts
//---------------------------------------------------------------------------
(function() {
	'use strict';
	//-------------
	// Dependencies
	//-------------
	// var restify = require('restify');
	// var restapi = require('./restapi');
	// var path = require("path");
	// var filed = require("filed");
	// var mime = require("mime");
    // var routes = require('./routes');
    // var routes = require('./restinterface');

	//-----------------------------------
	// Internal functions
	//-----------------------------------

	// Serve static web client file
	// function serve(req, res, next) {
	// 	var fname = path.normalize("./public" + req.path());

	// 	res.contentType = mime.lookup(fname);
	// 	var f = filed(fname);
	// 	f.pipe(res);
	// 	f.on("end", function () {
	// 		return next(false);
	// 	});

	// 	return false;
	// }

	// // Serve static web client index.html
	// function serveIndex(req, res, next) {
	// 	var fname = path.normalize("./views/index.html");

	// 	res.contentType = mime.lookup(fname);
	// 	var f = filed(fname);
	// 	f.pipe(res);
	// 	f.on("end", function () {
	// 		return next(false);
	// 	});

	// 	return false;
	// }

	function sendRestResponse(req, res, next, err, response, wrapperName) {
		if (! err) {
			res.send(response);
			return next();
		}
		else {
			console.log(err);
			console.log(response);
			return next(err);
		}
	}

	//------------
	// Constructor
	//------------	
	var initialize = function(config, app) {
		//------------------------------
		// Initialize the REST interface
		//------------------------------

		//------------------------------
		// Initialize clients
		//------------------------------
		// var repositoriesClient = restify.createJsonClient({
		//   url: restapi.RDFREPO_REPOSITORIES,
		//   version: '*'
		// });
		
		//------------------------
		// User Interface
		//------------------------

		// Get repositories
		// app.get(restapi.REPOSITORIES, function(req, res, next){
		// 	console.log('GET ' + req.path());
		// 	client.get('/'+restapi.DYDRA_ACCOUNT_ID+'/repositories', function(err, jreq, jres, obj) {
		// 		sendRestResponse(req, res, next, err, obj);
		// 	});
		// });

		//---------------------
		// Serve static content
		//---------------------
		// app.get(/javascripts\/.*/, serve);
		// app.get(/fonts?\/.*/, serve);
		// app.get(/images\/.*/, serve);
		// app.get(/stylesheets\/.*/, serve);
		// // Anything else is redirected to SPA (index.html)
		// app.get(/.*/, serveIndex);

		//-------------------------
		// Start the REST interface
		//-------------------------
		// server = app.listen(config.port, function() {
		//   console.log('im-accounts listening at %s', app.url);
		// });

		//------------------------------------
		// Return the newly created 'instance'
		//------------------------------------
		// return server;
	};

	//---------------
	// Module exports
	//---------------
	module.exports.initialize = function(config, app) {
		return initialize(config, app);
	};
}());