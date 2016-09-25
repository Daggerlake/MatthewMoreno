var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {  res.status(status);
  res.json(content);
};

module.exports.reviewsCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function(req, res) {
  if(req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(function(err, location) {
        if (!location) {
          // if Mongoose doesn't return a location
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          console.log("reviewsReadOne locationid not found");
          return;
        } else if (err) {
          // if Mongoose returned an error
          sendJsonResponse(res, 404, err);
          console.log("reviewsReadOne Mongoose error");
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          // if the returned locaiton has reviews
          // search for reviews matching id
          review = location.reviews.id(req.params.reviewid);
          if (!review) {
            // if review isn't found
            sendJsonResponse(res, 404, {
              "message": "reviewid not found"
            });
            console.log("reviewsReadOne reviewid not found");
            return;
          } else {
            // if review is found, build response object
            response = {
              location : {
                name : location.name,
                id : req.params.locationid
              },
              review : review
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          // if returned location does not have reviews
          sendJsonResponse(res, 404, {
            "message": "No reviews found"
          });
          console.log("reviewsReadOne no reviews found");
        }
      }
    );
  } else {
    // if request paramaters didn't include locationid or reviewid
    sendJsonResponse(res, 404, {
      "message": "Missing locationid or reviewid in request; both are required"
    });
    console.log("reviewsReadOne missing locationid or reviewid in request");
  }
};
module.exports.reviewsUpdateOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.reviewsDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
