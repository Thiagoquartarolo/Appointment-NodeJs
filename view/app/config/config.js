(function() {
  'use strict';

  angular.module('app')
    .constant('Configuration', {
  		serviceUrl: 'http://localhost:3000/api',
  		client: {
  			id: 'appointment',
  			secret: 'appointment@password'
  		}
  	})
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('httpInterceptor');
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(['$routeProvider', function($routeProvider) {

  		$routeProvider

      .when('/', {
        templateUrl : 'app/profiler/profiler.html',
        controller  : 'profilerController',
        controllerAs: 'vm'
      })
        .otherwise({ redirectTo: '/' });

		}]);
})();
