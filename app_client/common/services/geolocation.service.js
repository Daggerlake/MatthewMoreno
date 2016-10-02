angular
  .module('loc8rApp')
  .service('geolocation', geolocation);
  
// create geolocation service
function geolocation () {
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
}
