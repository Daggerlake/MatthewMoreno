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
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    // create array of facilities by splitting a
    // comma-separated list
    facilities: req.body.facilities.split(","),
    // parse coordinates from strings to numbers
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  },
  // suppply callback funciton, containing appropriate
  // responses for success and failure
  function (err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
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
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    console.log("locationsUpdateOne locationid is required");
    return;
  }
  // find location document by supplied id
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec(
      function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          console.log("locationsUpdateOne locationid not found");
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        // update paths with values from submitted form
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
          days: req.body.days1,
          opening: req.body.opening1,
          closed: req.body.closed1,
        }, {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        }];
        // save instance, sending approprate response depending on outcome
        location.save(function(err, location) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, location);
          }
        });
      }
    );
};
module.exports.locationsDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
