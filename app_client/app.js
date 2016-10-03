//Add ngRoute as a dependency
(function () {

angular.module('loc8rApp', ['ngRoute']);

// Model config function to hold route definitions
function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
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
