// Use module getter to add new controller to application
angular
  .module('loc8rApp')
  .controller('homeCtrl', homeCtrl);

// Define new controller homeCtrl
// and bind some data for page header and sidebar
function homeCtrl ($scope) {
  $scope.pageHeader = {
    title: 'Loc8r',
    strapline: 'Find places to work with wifi near you!'
  };
  $scope.sidebar = {
    content: "Looking for wifi and a seat etc etc"
  };
}
