var mappings = require('../rdf-mappings');

var GOOGLE_PROFILE_JSON = '{"provider":"google","id":"101543879134519816313","displayName":"Erik Larsson","name":{"familyName":"Larsson","givenName":"Erik"},"emails":[{"value":"erikxiv@gmail.com"}],"_raw":"{\\n \\"id\\": \\"101543879134519816313\\",\\n \\"email\\": \\"erikxiv@gmail.com\\",\\n \\"verified_email\\": true,\\n \\"name\\": \\"Erik Larsson\\",\\n \\"given_name\\": \\"Erik\\",\\n \\"family_name\\": \\"Larsson\\",\\n \\"link\\": \\"https://plus.google.com/101543879134519816313\\",\\n \\"picture\\": \\"https://lh6.googleusercontent.com/-IaIwN0JN-C4/AAAAAAAAAAI/AAAAAAAAAAA/XKMLTIL2f7Y/photo.jpg\\",\\n \\"gender\\": \\"male\\",\\n \\"locale\\": \\"sv\\"\\n}\\n","_json":{"id":"101543879134519816313","email":"erikxiv@gmail.com","verified_email":true,"name":"Erik Larsson","given_name":"Erik","family_name":"Larsson","link":"https://plus.google.com/101543879134519816313","picture":"https://lh6.googleusercontent.com/-IaIwN0JN-C4/AAAAAAAAAAI/AAAAAAAAAAA/XKMLTIL2f7Y/photo.jpg","gender":"male","locale":"sv"}}';
var GOOGLE_PROFILE_JS = JSON.parse(GOOGLE_PROFILE_JSON);
var GOOGLE_PROFILE_N3 = '<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/displayName> "Erik Larsson" . \n\
<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/email> "erikxiv@gmail.com" . \n\
<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/id> "101543879134519816313" . \n\
<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/name/familyName> "Larsson" . \n\
<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/name/givenName> "Erik" . \n\
<http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/provider> "google" . \n';

describe("RDF mappings", function() {
	it("can transform a google passport.js profile to im-accounts RDF", function() {
		expect(mappings.mapPassportProfileToRdfUser(GOOGLE_PROFILE_JS).toNT().replace(/\r\n/g, "\n")).toEqual(GOOGLE_PROFILE_N3);
	});
});