(function() {
    'use strict';

    angular
        .module('app')
        .controller('profilerController', profilerController);

    profilerController.$inject = ['$scope', 'profilerService', 'userService', 'securityService', 'toastr'];

    function profilerController($scope, profilerServices, userService, securityService, toastr) {
        var vm = this;

        vm.markChangedItem = function(user){
          user.changed = !user.changed;
        };

        vm.save = function () {
          var changedUsers = [];
          vm.users.forEach(function(user){
            if(user.changed){
              delete user.changed;
              changedUsers.push(user);
            }
          });

          profilerServices.save(changedUsers)
          .then(function(){
            toastr.success('Controle de Perfis', 'Perfis salvos com sucesso');
          })
          .catch(function(err){
            toastr.warning('Controle de Perfis', 'Erro ao salvar perfis');
            console.log(err);
            init();
          })
        };

        init();

        function init() {
          userService.get()
          .then(function(data){
            vm.users = data.data || data;
          });
        }

    }
})();
