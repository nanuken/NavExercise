(function (huge) {
    'use strict';
    /**
     * @namespace events
     */
    huge.events = huge.events || {};

    huge.events.Events = (function () {

        var _eventCallbacks = {};

        /**
         * @constructor
         */
        (function () {
            //console.log('event listeners');
        }());

        /**
         * Adds a new event listener
         * @param {String}   type     The event type
         * @param {Function} callback The event callback
         * @function
         */
        function addEventListener(type, callback) {
            if (!_eventCallbacks[type]) {
                _eventCallbacks[type] = [];
            }
            _eventCallbacks[type].push(callback);
        }

        /**
         * Dispatch the listener
         * @param  {String}   type     The event type
         * @param  {Array.<Object>} data The data passed to the listener
         * @function
         */
        function dispatchEvent(type, data) {
            var i,
                callbacks = _eventCallbacks[type];

            //console.log('dispatchEvent', type, data, callbacks);

            for (i in callbacks) {
                //console.log('calling:',type,i, callbacks[i].toString());
                callbacks[i](data);
            }
        }

        return {
            addEventListener: addEventListener,
            dispatchEvent: dispatchEvent
        }

    })();
}(window.huge));