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

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// to be used as Angular filter, formatDistance function must return a function
// that accepts distance parameter rather than accepting it itself
var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      // if greater than 1,000m, display as km with one decimal unit
      if (distance >= 1000) {
        numDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
      // otherwise, display as meters with no decimal units
      } else {
        numDistance = parseInt(distance);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

var ratingStars = function () {
  return {
      // Add scope option to directive definition to isolate scope
      scope : {
        // Create new variable thisRating and tell Angular
        // to get value from attribute called rating
        thisRating : '=rating'
      },
      // Update template to use new variable
      templateUrl : '/angular/rating-stars.html'
  };
};


angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars);
