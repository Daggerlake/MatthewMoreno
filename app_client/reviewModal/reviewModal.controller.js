(function () {

  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];

  function reviewModalCtrl ($uibModalInstance, loc8rData, locationData) {
    var vm = this;

    vm.locationData = locationData;

    vm.onSubmit = function () {
      vm.formError = "";
      if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      }
    };

    vm.doAddReview = function (locationid, formData) {
      loc8rData.addReviewById(locationid, {
        author : formData.name,
        rating : formData.rating,
        reviewText : formData.reviewText
      })
        .success(function (data) {
          // when a new review has been successfully added to database,
          // send returned data to to modal close helper method
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Your review has not been saved, try again";
        });
        return false;
    };

    vm.modal = {
      close : function (result) {
        //console.log(result);
        // create helper method to call modal instance close method,
        // passing through supplied data
        $uibModalInstance.close(result);
      },
      cancel : function () {
        $uibModalInstance.dismiss('cancel');
      }
    }
  }
}) ();
