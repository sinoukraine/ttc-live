window.hubHelper = function (option, callbacks) {

    var _option = {
        url: "",
        qs: {},
        hub: ""
    };

    _option = option;
    var _shutdown = false;

    $.connection.hub.qs = _option.qs;
    $.connection.hub.url = _option.url + '/signalr';

    var hubService = $.connection[_option.hub];

    if (hubService) {
        if (callbacks)
            for (var method in callbacks) {
                hubService.client[method] = callbacks[method];
            }
    }
    else {
        return false;
    }
    return {
        server: hubService.server,
        stop: function () {
            _shutdown = true;
            $.connection.hub.stop();
        },
        start: function (events) {
            _shutdown = true;
            $.connection.hub.stop();
            $.connection.hub.disconnected(function () {
                if (_shutdown) { return; }
                setTimeout(function () {
                    if (_shutdown) { return; }
                    $.connection.hub.start();
                }, 2000);
            });

            $.connection.hub.start().done(function () {
                _shutdown = false;
                if (events && events.done) {
                    events.done();
                }
            }).fail(function () {
                if (events && events.fail) {
                    events.fail();
                }
            });;
        }

    };
};