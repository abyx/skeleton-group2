angular.module('app', ['ngRoute']);

angular.module('app').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
    .when('/Admin', {
      templateUrl: 'Admin.html',
      controller: 'AdminCtrl',
      controllerAs: 'Admin'
    })
    .when('/view2', {
      templateUrl: 'view2.html',
      controller: 'View2Ctrl',
      controllerAs: 'view2'
    })
    .otherwise({redirectTo: '/'});
});
