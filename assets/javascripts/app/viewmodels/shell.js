function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

define(['plugins/router', 'durandal/app', 'user'], function (router, app, user) {
    return {
        router: router,
        user: user,
        activate: function () {
            // Get iframe login messages
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
            eventer(messageEvent,function(e) {
                var msg = JSON.parse(e.data);
                // console.log('received event from iframe: ' + msg.type);
                user.setProfile(msg.profile);
                if (msg.type === 'loginSucceeded' || msg.type === 'loginFailed') {
                    // Remove accessToken from URI
                    router.navigate('/', false);
                }
                // console.log(e.data);
                // console.log("origin: " + e.origin);
                // console.log("source: " + e.source);
            },false);

            // Create login iframe
            var accessToken = getParameterByName('code');
            var ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", "iframe" + (accessToken?'?code='+accessToken:''));
            ifrm.style.width = 0;
            ifrm.style.height = 0;
            ifrm.class = "hidden";
            ifrm.tabindex = -1;
            ifrm.title = "empty";
            document.body.appendChild(ifrm);

            // Setup routes
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});