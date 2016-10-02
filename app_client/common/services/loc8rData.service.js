angular
  .module('loc8rApp')
  .service('loc8rData', loc8rData);

// pass $http service into existing service function
var loc8rData = function ($http) {
  var locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&dmax=10000');
  };
  return {
    // return locationByCoords function
    // making it accessible as method of service
    locationByCoords : locationByCoords
  };
};
