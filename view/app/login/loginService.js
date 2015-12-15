(function(){
    'use strict';

    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', '$httpParamSerializer', 'Configuration'];

    function loginService($http, $httpParamSerializer, Configuration) {

      var service = {
        authenticate: authenticate,
        getOffice365LoginUrl: getOffice365LoginUrl
      };
      return service;

      function authenticate(username, password) {
        var data = $httpParamSerializer({
          grant_type: 'password',
          client_id: Configuration.client.id,
          client_secret: Configuration.client.secret,
          username: username,
          password: password
        });

        return $http.post(Configuration.serviceUrl + '/token', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }

      function getOffice365LoginUrl(){
        return $http.get('/api/authorize/o365/url');
      }
  }

}());
