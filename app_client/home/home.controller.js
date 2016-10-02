// Use module getter to add new controller to application
angular
  .module('loc8rApp')
  .controller('homeCtrl', homeCtrl);

// Define new controller homeCtrl
// and bind some data for page header and sidebar
function homeCtrl ($scope, loc8rData, geolocation) {
  var vm = this;
  vm.pageHeader = {
    title: 'Loc8r',
    strapline: 'Find places to work with wifi near you!'
  };
  vm.sidebar = {
    content: "Looking for wifi and a seat etc etc"
  };

  vm.message = "Checking your location...";

  // function to run if geolocation is successful
  vm.getData = function(position) {
    var lat = position.coords.latitude, lng = position.coords.longitude;
    // set default message letting user know that
    // data is being retrieved in the background
    vm.message = "searching for nearby places...";
    // invoke loc8rDAta service, which returns $http.get call
    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        // on successful response, pass returned data into callback function
        // apply this data to scope
        // if request returns successfully and there's some data,
        // clear the message
        //otherwise, let user know that nothing was found
        vm.message = data.length > 0 ? "" : "No locations found";
        $scope.data = { locations: data };
      })
      .error(function (e) {
        // if web service returned error,
        // pass error to callback function
        console.log(e);
        // if asynchronous call returns an error,
        // let the user know something is wrong
        vm.message = "Sorry, something's gone wrong";
      });
  };

  // function to run if geolocation is supported but not successful
  vm.showError = function (error) {
    $scope.$apply(function() {
      vm.message = error.message;
    });
  }
  // function to run if geolocation isn't supported by browser
  vm.noGeo = function () {
    $scope.$apply(function() {
      vm.message = "Geolocation is not supported by this browser.";
    });
  };

  geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
}
