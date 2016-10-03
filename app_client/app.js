//Add ngRoute as a dependency
(function () {

angular.module('loc8rApp', ['ngRoute', 'ngSanitize']);

// Model config function to hold route definitions
function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/about', {
      templateUrl: '/common/views/genericText.view.html',
      controller: 'aboutCtrl',
      controllerAs: 'vm'
    })
    .when('/location/:locationid', {
      templateUrl: '/locationDetail/locationDetail.view.html',
      controller: 'locationDetailCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode({enabled: true, requireBase: false});
}

// Add config to module, passing through $routeProvider as a dependency
angular
  .module('loc8rApp')
  .config(['$routeProvider', '$locationProvider', config]);
}) ();
