(function () {
    'use strict';

    angular
        .module('app')
        .controller('shellController', shellController);

    shellController.$inject = ['$scope', '$location', '$route', 'shellServices', 'securityService'];

    function shellController($scope, $location, $route, shellServices, securityService) {
        var vm = this;
        vm.user = securityService.getUser();
        vm.selected = $location.path().replace('/', '');
        vm.loading = false;
        vm.menu = [];

        vm.isLoggedOn = function () {
            return securityService.isLoggedOn();
        };

        vm.logOut = function () {
            securityService.logout();
            $location.path('/');
        };

        $scope.$on("login_success", function () {

        });

        $scope.$on("loader_show", function () {
            vm.loading = true;
        });

        $scope.$on("loader_hide", function () {
            vm.loading = false;
        });

        verifyPath();

        if (vm.isLoggedOn()) {

        }

        function verifyPath() {
            if (!securityService.isLoggedOn() && $location.path() !== '/') {
                $location.path('/');
            }
        }
    }

})();
