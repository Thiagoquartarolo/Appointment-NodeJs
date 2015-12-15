(function() {
    'use strict';

    angular
        .module('app')
        .factory('shellServices', shellServices);

    shellServices.$inject = ['$http'];

    function shellServices($http) {
        var service = {
            getMenu: getMenu
        };

        return service;

        function getMenu() {
          return $http.get('/api/menu');
        }
    }
})();
