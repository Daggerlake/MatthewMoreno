var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsListByDistance = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
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
