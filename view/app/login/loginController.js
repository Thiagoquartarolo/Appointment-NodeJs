(function(){
  'use strict';

  angular.module('app')
    .controller('loginController', loginController);

  loginController.$inject = ['$window', '$location', '$rootScope', 'loginService', 'securityService', 'userService', 'toastr'];

  function loginController($window, $location, $rootScope, loginService, securityService, userService, toastr) {
    var vm = this;

    vm.credential = {
      username: undefined,
      password: undefined
    };

    vm.logon = function(){
      loginService.authenticate(vm.credential.username, vm.credential.password)
      .then(function(data) {
        data = data.data || data;
        securityService.setToken(data.access_token);
        userService.get({
          username: vm.credential.username
        })
        .then(function(data) {
            data = data.data || data;
            var logged = data[0];
            securityService.setUser(logged);
            toastr.success(logged.username, 'Login efetuado com sucesso!');
            $rootScope.$broadcast('login_success');

            $location.path('/solicitacoes');
        });
      })
      .catch(function(data) {
        toastr.warning('Falha ao efetuar login', 'Usuário e/ou Senha Inválidos!');
      });
    };

    loginService.getOffice365LoginUrl()
    .then(function(data){
      vm.office365LoginUrl = data.data || data;
    });

    verifyQueryString();

    function verifyQueryString() {
      if($location.$$search.error){
        toastr.warning('Falha ao efetuar login', $location.$$search.error);
      }

      if($location.$$search.token && $location.$$search.username){
        securityService.setToken($location.$$search.token);
        userService.get({
          username: $location.$$search.username
        })
        .then(function(data) {
            data = data.data || data;
            var logged = data[0];
            securityService.setUser(logged);
            toastr.success(logged.username, 'Login efetuado com sucesso!');
            $rootScope.$broadcast('login_success');

            $location.path('/solicitacoes');
        });
      }
    }

  }

}());
