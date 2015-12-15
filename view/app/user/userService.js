(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$http', 'qsUtil', 'securityService'];

  function userService($http, qsUtil, securityService) {
    var service = {
      get: get,
      getADM: getADM,
      getRequester: getRequester,
      changePassword: changePassword
    };

    return service;

    function get(filter) {
      return $http.get('/api/users' + qsUtil.objectToQueryString(filter));
    }

    function getADM() {
      return $http.get('/api/users/ADM');
    }

    function getRequester(){
      return $http.get('/api/users/Requester');
    }

    function changePassword(currentPassword, newPassword){
      var user = securityService.getUser();
      return $http.post('/api/user/' + user._id + '/password', {
        currentPassword: currentPassword,
        newPassword: newPassword
      });
    }
  }
})();
