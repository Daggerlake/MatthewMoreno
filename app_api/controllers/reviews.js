var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {  res.status(status);
  res.json(content);
};

module.exports.reviewsCreate = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            // successful find operation calls new
            // function to add review, passing request,
            // response, and location objects
            doAddReview(req, res, location);
          }
        }
      );
  } else {
      sendJsonResponse(res, 404, {
        "message": "Not found, locationid required"
      });
      console.log("reviewsCreate locationid not provided");
  }
};

var doAddReview = function(req, res, location) {
  //
  if (!location) {
    sendJsonResponse(res, 404, {
      "message": "locationid not found"
    });
    console.log("doAddReview locationid not found");
  } else {
    // push new data into the subdocument array...
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    // save it
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        console.log(err);
        sendJsonResponse(res, 400, err);
      } else {
        // on successful save operation, call function to update average rating
        updateAverageRating(location._id);
        // retrieve last review added to array and return it as JSON
        // confirmation response
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(locationid) {
  // Find correct document given supplied ID
  Loc
    .findById(locationid)
    .select('rating reviews')
    .exec(
      function(err, location) {
        if (!err) {
          doSetAverageRating(location);
        }
      });
};

var doSetAverageRating = function(location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    // loop through review subdocuments adding up ratings
    for (i = 0; i < reviewCount; i ++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    // calculating average rating value
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    // updating rating value of parent document
    location.rating = ratingAverage;
    // save parent document
    location.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
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
  if(!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    console.log("reviewsUpdateOne locationid and reviewid are both required");
    return;
  }
  // find parent document
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        var thisReview;
        if(!location) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          // find subdocument
          thisReview = location.reviews.id(req.params.reviewid);
          if (!thisReview) {
            sendJsonResponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            // make changes to subdocument from supplied form data
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            location.save(function(err, location) {
              // return a JSON response, sending subdocument object
              // depending on whether save was successful
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                updateAverageRating(location._id);
                sendJsonResponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No review to update"
          });
          console.log("reviewsUpdateOne no review to update");
        }
      }
    );
};
module.exports.reviewsDeleteOne = function(req, res) {
  if(!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          console.log("reviewsDeleteOne locationid not found");
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          if (!location.reviews.id(req.params.reviewid)) {
            sendJsonResponse(res, 404, {
              "message": "reviewid not found"
            });
            console.log("reviewsDeleteOne reviewid not found");
          } else {
            // find and delete relevant subdocument in one step
            location.reviews.id(req.params.reviewid).remove();
            // save parent document
            location.save(function(err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                updateAverageRating(location._id);
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No review to delete"
          });
          console.log("reviewsDeleteOne no review to delete");
        }
      }
    );
};
