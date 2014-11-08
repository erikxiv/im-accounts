define(['plugins/router', 'durandal/app', 'knockout', 'user'], function (router, app, ko, user) {
    return {
        user: user,
        activate: function () {
            return true;
        },
        login: function() {
            // TODO: Configurable whether to use localhost or accounts.informationmeet.com
            window.location.replace("/auth/google?redirect="+encodeURIComponent(window.location.href));
        },
        logout: function() {
            // TODO: Add logout functionality
            // $.ajax({
            //     type: "GET",
            //     url: "/rest/user/logout",
            //     dataType: "json"
            // })
            // .done(function( msg ) {
            //     console.log("User logged out");
            //     this.userLoggedIn(false);
            // }.bind(this))
            // .error(function(jqXHR, textStatus, errorThrown) {
            //     if (jqXHR.status == 401) {
            //         console.log("User not logged in");
            //         this.userLoggedIn(false);
            //     }
            //     else {
            //         console.log("Unexpected error when logging out: " + errorThrown);
            //     }
            // }.bind(this));
            return true;
        }
    };
});
