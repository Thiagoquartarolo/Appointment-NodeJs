(function() {
  'use strict';

  angular.module('app')
    .factory('httpInterceptor', httpInterceptor);

  httpInterceptor.$inject = ['$q', '$rootScope', '$location', 'toastr', 'securityService'];

  function httpInterceptor($q, $rootScope, $location, toastr, securityService) {
    var numLoadings = 0;
    var service = {
      request: request,
      response: response,
      responseError: responseError
    };
    return service;


      function request(request) {
        request.headers['Authorization'] = 'Bearer ' + securityService.getToken();

        numLoadings++;
        $rootScope.$broadcast("loader_show");
        return request || $q.when(request);
      }

      function response(response) {
        if ((--numLoadings) === 0) {
          $rootScope.$broadcast("loader_hide");
        }
        return response || $q.when(response);
      }

      function responseError(response) {
        if (response.status == 401 && securityService.isLoggedOn()) {
          securityService.logout();
          $location.path('/');
          toastr.warning("Seu token expirou ou é inválido...");
          console.log(response.headers);
        }
        if (response.status == 403 && securityService.isLoggedOn()) {
          toastr.warning("Você não possui permissão para esta operação. Contate o administrador do sistema.");
          console.log(response.headers);
        }
        if (response.status == 500) {
          toastr.error("Ops, ocorreu um erro inesperado...");
          console.log(response.headers);
        }
        if (!(--numLoadings)) {
          $rootScope.$broadcast("loader_hide");
        }
        return $q.reject(response);
      }

  }

})();
