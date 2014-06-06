define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
    return {
        userDisplayName: ko.observable(""),
        userEmail: ko.observable(""),
        userProvider: ko.observable(""),
        userBeingRetrieved: ko.observable(true),
        userLoggedIn: ko.observable(false),
        activate: function () {
            console.log("ajaxy");
            $.ajax({
                type: "GET",
                url: "/rest/user",
                dataType: "json"
            })
            .done(function( msg ) {
                console.log("User logged in: " + msg.displayName);
                this.userDisplayName(msg.displayName);
                this.userEmail(msg.emails[0].value);
                this.userProvider(msg.provider);
                this.userLoggedIn(true);
                this.userBeingRetrieved(false);
                // console.log(msg);
            }.bind(this))
            .error(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log("User not logged in");
                }
                else {
                    console.log("Unexpected error when retrieving user status: " + errorThrown);
                }
                console.log(this);
                this.userLoggedIn(false);
                this.userBeingRetrieved(false);
            }.bind(this));
            return true;
        },
        login: function() {
            console.log(router);
            window.location.replace("/auth/google_oauth2");
        },
        logout: function() {
            $.ajax({
                type: "GET",
                url: "/rest/user/logout",
                dataType: "json"
            })
            .done(function( msg ) {
                console.log("User logged out");
                this.userLoggedIn(false);
            }.bind(this))
            .error(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log("User not logged in");
                    this.userLoggedIn(false);
                }
                else {
                    console.log("Unexpected error when logging out: " + errorThrown);
                }
            }.bind(this));
            return true;
        }
    };
});
