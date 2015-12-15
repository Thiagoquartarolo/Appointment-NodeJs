(function() {
  'use strict';

  angular
    .module('app')
    .factory('securityService', securityService);

  securityService.$inject = ['$localStorage', 'Configuration'];

  function securityService($localStorage, Configuration) {

    var service = {
      setToken: setToken,
      getToken: getToken,
      setUser: setUser,
      getUser: getUser,
      logout: logout,
      isLoggedOn: isLoggedOn

    };
    return service;

    function setUser(user) {
      $localStorage.user = user;
    }

    function getUser() {
      return $localStorage.user;
    }

    function setToken(token) {
      $localStorage.token = token;
    }

    function getToken() {
      return $localStorage.token;
    }

    function isLoggedOn() {
      return !!$localStorage.user;
    }

    function logout() {
      delete $localStorage.user;
      delete $localStorage.token;
    }

  };

})();
