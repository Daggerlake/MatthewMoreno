(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  // Inject $routeParams service into controller, protecting against
  // minification
  locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
  function locationDetailCtrl ($routeParams, $uibModal, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    loc8rData.locationById(vm.locationid)
      .success(function (data) {
        // if request is successful, save returned data in view model
        vm.data = { location: data };
        vm.pageHeader = {
          // output location name to page header
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        // if request isn't successful, output error message to browser console
        console.log(e);
      });
  }
}) ();
