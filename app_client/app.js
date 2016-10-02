//Add ngRoute as a dependency
(function () {

angular.module('loc8rApp', ['ngRoute']);

// Model config function to hold route definitions
function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
}

// Add config to module, passing through $routeProvider as a dependency
angular
  .module('loc8rApp')
  .config(['$routeProvider', config]);
}) ();
