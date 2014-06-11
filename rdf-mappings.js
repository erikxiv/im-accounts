var rdfstore = require('rdfstore');

var NS_IM_USERS = 'http://accounts.informationmeet.com/users/';
var NS_PORTABLE_CONTACTS = 'http://portablecontacts.net/ns/1.0/';

var rdf = rdfstore.create().rdf;
rdf.setPrefix('imusers', NS_IM_USERS);
rdf.setPrefix('pc', NS_PORTABLE_CONTACTS);

var displayName = rdf.createNamedNode(rdf.resolve('pc:displayName'));
var email = rdf.createNamedNode(rdf.resolve('pc:email'));
var id = rdf.createNamedNode(rdf.resolve('pc:id'));
var familyName = rdf.createNamedNode(rdf.resolve('pc:name/familyName'));
var givenName = rdf.createNamedNode(rdf.resolve('pc:name/givenName'));
var provider = rdf.createNamedNode(rdf.resolve('pc:provider'));

// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/displayName> "Erik Larsson" .
// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/email> "erikxiv@gmail.com" .
// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/id> "101543879134519816313" .
// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/name/familyName> "Larsson" .
// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/name/givenName> "Erik" .
// <http://accounts.informationmeet.com/users/101543879134519816313@google> <http://portablecontacts.net/ns/1.0/provider> "google" .

var mapPassportProfileToRdfUser = function(profile) {
	var subject = rdf.createNamedNode(rdf.resolve('imusers:'+profile.id+'@'+profile.provider));
	var graph = rdf.createGraph();
	graph.add(rdf.createTriple(subject, displayName, rdf.createLiteral(profile.displayName)));
	graph.add(rdf.createTriple(subject, email, rdf.createLiteral(profile.emails[0].value)));
	graph.add(rdf.createTriple(subject, id, rdf.createLiteral(profile.id)));
	graph.add(rdf.createTriple(subject, familyName, rdf.createLiteral(profile.name.familyName)));
	graph.add(rdf.createTriple(subject, givenName, rdf.createLiteral(profile.name.givenName)));
	graph.add(rdf.createTriple(subject, provider, rdf.createLiteral(profile.provider)));
	return graph;
}

exports.mapPassportProfileToRdfUser = mapPassportProfileToRdfUser;