var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsListByDistance = function(req, res) {
  // get coordinates from query string
  // and convert strings into numbers
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var dmax = parseFloat(req.query.dmax);
  // create geoJSON point
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  var geoOptions = {
    spherical: true,
    maxDistance: dmax,
    num: 10
  };

  // check lng, lat, dmax query parameters exist in correct format
  // otherwise, return 404 error
  if (!lng || !lat) {
    sendJsonResponse(res, 404, {
      "message": "lng, lat, and dmax query parameters are required"
    });
    return;
  }

  Loc.geoNear(point, geoOptions, function (err, results, stats) {
    // to hold processed data, will be returned
    var locations = [];
    // if geoNear query returns error, send as response with 404 status
    if(err) {
      sensJsonResponse(res, 404, err);
    } else {

      // process the data and then push it into the return object
      results.forEach(function(doc) {
        locations.push({
          distance: doc.dis,
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, locations);
    }
  });
};

module.exports.locationsCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsReadOne = function(req, res) {
  if(req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          // if Mongoose doesn't return a location
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          console.log("locationsReadOne locationid not found");
          return;
        } else if (err) {
          // if Mongoose returned an error
          sendJsonResponse(res, 404, err);
          console.log("locationsReadOne Mongoose error");
          return;
        }
        // return the location and 200 response if no errors
        sendJsonResponse(res, 200, location);
      });

  } else {
    // if request paramaters didn't include locationid
    sendJsonResponse(res, 404, {
      "message": "No locationid in request"
    });
    console.log("locationsReadOne no locationID in request");
  }
};
module.exports.locationsUpdateOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.locationsDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
