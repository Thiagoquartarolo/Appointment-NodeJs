(function() {
    'use strict';

    angular
        .module('app')
        .factory('profilerService', profilerService);

    profilerService.$inject = ['$http'];

    function profilerService($http) {
        var service = {
          save:  save
        };

        return service;

        function save(users){
          return $http.post('/api/users', users);
        }
    }
})();
