//Add ngRoute as a dependency
angular.module('loc8rApp', ['ngRoute']);

// Model config function to hold route definitions
function config ($routeProvider) {
  $routeProvider
    .when('/', {
    })
    .otherwise({redirectTo: '/'});
}

// Add config to module, passing through $routeProvider as a dependency
angular
  .module('loc8rApp')
  .config(['$routeProvider', config]);
