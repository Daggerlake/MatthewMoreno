(function () {
angular
  .module('loc8rApp')
  .directive('ratingStars', ratingStars);

function ratingStars() {
  return {
    // only use the rating-stars directive when rating-stars is its own element
    // or an attribute of another element
    restrict : 'EA',
    scope : {
      thisRating : '=rating'
    },
    templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
  };
}
}) ();
