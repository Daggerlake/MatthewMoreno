(function() {
angular
  .module('loc8rApp')
  .service('loc8rData', loc8rData);

// inject dependencies to protect against minification
loc8rData.$inject = ['$http'];
// pass $http service into existing service function
function loc8rData ($http) {
  var locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&dmax=10000');
  };

  var locationById = function (locationid) {
    return $http.get('/api/locations/' + locationid);
  };

  var addReviewById = function (locationid, data) {
    return $http.post('/api/locations/' + locationid + '/reviews', data);
  };

  return {
    // return locationByCoords function
    // making it accessible as method of service
    locationByCoords : locationByCoords,
    locationById : locationById,
    addReviewById : addReviewById
  };
}
}) ();
