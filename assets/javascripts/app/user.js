define(['knockout'], function (ko) {
    return {
        displayName: ko.observable(""),
        email: ko.observable(""),
        provider: ko.observable(""),
        beingRetrieved: ko.observable(true),
        loggedIn: ko.observable(false),
        setProfile: function(profile) {
            // console.log('setting profile ' + profile);
            if (profile) {
                this.displayName(profile.displayName);
                this.provider(profile.provider);
                this.email(profile.emails[0].value);
                this.loggedIn(true);
            }
            this.beingRetrieved(false);
        }
    };
});