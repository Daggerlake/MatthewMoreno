angular.module('loc8rApp', []);

// Angular controller code, accepting $scope parameter
var locationListCtrl = function ($scope) {
  $scope.data = {
    locations : [{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '29.6456',
      _id: '5370a35f2536f6785f8dfb6a'
    },{
      name: 'Costy',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
      distance: '78.65456',
      _id: '5370a35f2536f6785f8dfb6a'
  }]};
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl);
