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

    vm.popupReviewForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve : {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });
      // when modal promise is resolved
      // push returned data into array of reviews;
      // Angular binding will do the rest
      modalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
      });
    };
  }
}) ();
