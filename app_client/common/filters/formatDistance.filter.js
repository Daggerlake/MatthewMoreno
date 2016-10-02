angular
  .module('loc8rApp')
  .filter('formatDistance', formatDistance);


  var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

// to be used as Angular filter, formatDistance function must return a function
// that accepts distance parameter rather than accepting it itself
function formatDistance () {
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
}
