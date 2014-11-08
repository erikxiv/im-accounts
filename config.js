'use strict';

(function() {

	//---------------
	// Internals
	//---------------
	var version = 'v1';
	var RDFREPO_REST_API_URL = 'http://rdfrepo.informationmeet.com/rest/v1';
	var clientID = process.env.AUTH_GOOGLE_CLIENT_ID || '894804733486-88sokr24mclq90ld4emhiesk1adhnaro.apps.googleusercontent.com';
	var clientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || 'rbGaQbepGzfkNJeOu81g09bR';
	var callbackURL = process.env.AUTH_GOOGLE_CALLBACK || 'http://localhost:3000/auth/google/callback';
	var jwtSecret = 'XmhNBrYDZUz6wqJ';

	//---------------
	// Module exports
	//---------------
	module.exports.initialize = function(config) {
		var result = {
			server: config.server,
			watch: config.watch,
			liveReload: config.liveReload,
			jwtSecret: jwtSecret,
			auth: {
				google: {
					clientId: clientID,
					clientSecret: clientSecret,
					callbackUrl: callbackURL
				}
			},
			rest: {
				users: {
					url: '/rest/' + version + '/users',
				}
			},
			rdfrepo: {
				repositories: {
					url: RDFREPO_REST_API_URL + '/repositories'
				},
				statements: {
					url: RDFREPO_REST_API_URL + '/statements'
				},
				namespaces: {
					url: RDFREPO_REST_API_URL + '/namespaces'
				}
			}
		}
		result.server.port = process.env.PORT || config.server.port;
		return result;
	};
}());
