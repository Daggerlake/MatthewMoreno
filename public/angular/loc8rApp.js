angular.module('loc8rApp', []);

// Angular controller code, accepting $scope parameter
// pass service name into controller function as a parameter
var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Checking your location...";

  // function to run if geolocation is successful
  $scope.getData = function(position) {
    // set default message letting user know that
    // data is being retrieved in the background
    $scope.message = "searching for nearby places...";
    // invoke loc8rDAta service, which returns $http.get call
    loc8rData
      .success(function(data) {
        // on successful response, pass returned data into callback function
        // apply this data to scope
        // if request returns successfully and there's some data,
        // clear the message
        //otherwise, let user know that nothing was found
        $scope.message = data.length > 0 ? "" : "No locations found";
        $scope.data = { locations : data };
      })
      .error(function (e) {
        // if web service returned error,
        // pass error to callback function
        console.log(e);
        // if asynchronous call returns an error,
        // let the user know something is wrong
        $scope.message = "Sorry, something's gone wrong";
      });
  };

  // function to run if geolocation is supported but not successful
  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  }
  // functio nto run if geolocation isn't supported by browser
  $scope.noGeo = function () {
    $scope.$apply(function() {
      $scope.message = "Geolocation is not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
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

// pass $http service into existing service function
var loc8rData = function ($http) {
  return $http.get('/api/locations?lng=-122.478256&lat=47.260099&dmax=10000');
};

// create geolocation service
var geolocation = function () {
  // Define function called getPosition that accepts three callback functions
  // for success, error, and not supported
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    // if geolocation supported...
    if (navigator.geolocation) {
      // ... call native method, passing through success and error callbacks
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    // if geolocation isn't supported...
    else {
      // ... invoke not supported callback
      cbNoGeo();
    }
  };
  return {
    // return getPosition function so it can be invoked from controller
    getPosition : getPosition
  };
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
