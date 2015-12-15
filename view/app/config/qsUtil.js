(function() {
    'use strict';

    angular
        .module('app')
        .factory('qsUtil', qsUtil);

    qsUtil.$inject = [];

    function qsUtil() {
        var service = {
            objectToQueryString: objectToQueryString
        };

        return service;

        function objectToQueryString(obj) {
          var qs = [];
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              qs.push(encodeURIComponent(prop) + "=" +
                      encodeURIComponent(obj[prop]));
            }
          }
          return "?" + qs.join('&');
        }
    }
})();
