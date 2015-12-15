(function() {
    'use strict';

    angular
        .module('app')
        .controller('userPasswordController', userPasswordController);

    userPasswordController.$inject = ['userService', 'securityService', 'toastr', '$location'];

    function userPasswordController(userService, securityService, toastr, $location) {
        var vm = this;
        vm.user = securityService.getUser();
        vm.currentPassword = null;
        vm.newPassword = null;
        vm.confirmNewPassword = null;

        vm.changePassword = function (argument) {
          if(vm.newPassword !== vm.confirmNewPassword){
            toastr.warning("Alteração de senha", "A confirmação de senha está diferente da nova senha.");
            return;
          }

          userService.changePassword(vm.currentPassword, vm.newPassword)
          .then(function(){
            toastr.success("Alteração de senha", "Senha alterada com sucesso");
            $location.path("/");
          })
          .catch(function(err){
            if(err.status === 400){
              toastr.warning("Alteração de senha", "Senha atual inválida");
            } else if(err.status !== 500){
              toastr.warning("Alteração de senha", "Ocorreu algum erro inesperado");
              console.log(err);
            }
          });
        }
    }
})();
