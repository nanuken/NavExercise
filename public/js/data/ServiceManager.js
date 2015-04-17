(function (huge) {
    'use strict';

    huge.data = huge.data || {};

    huge.data.ServiceManager = (function () {

        var serviceURL = huge.servicesBaseURL + "nav.json",
            _data;

        /**
         * @constructor
         */
        (function () {

        }());

        /**
         * Load the inbox json file
         * @param {Function}   type    callback function when the file load is succed
         * @function
         */
        function loadSiteConfiguration(fnSuccess) {
            _call(serviceURL, {}, fnSuccess);
        }

        /**
         * Invokes the required serive
         * @param {String}   type    the service url
         
         * @param {Function}   type    callback function when the file load is succeed
         * @function
         */
        function _call(url, params, fnSuccess, dataType, fnError) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = fnSuccess;
            httpRequest.open('GET', url);
            httpRequest.send();
        }

        return {
            loadSiteConfiguration: loadSiteConfiguration
        };
        /**/
    }());

}(window.huge || {}));