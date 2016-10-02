var request = require('request');
var apiOptions = {
  // set default server URL for local development
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  // if application is running in production mode set different base URL;
  // change to be live address of application
  apiOptions.server = "https://glacial-beach-72033.herokuapp.com";
}

var renderHomepage = function(req, res, responseBody) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.",
    // information from our request API
  });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  renderHomepage(req, res);
};

var getLocationInfo = function(req, res, callback) {
  var requestOptions, path;
  // Get locationid paramater from URL and append it to API path
  path = "/api/locations/" + req.params.locationid;

  // Set all request options needed to call API
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };

  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      // check for successful response from API
      if (response.statusCode === 200) {
        data.coords = {
          lng : body.coords[0],
          lat : body.coords[1]
        };
          // Call renderDetailPage function when API has responded
          callback(req, res, data);
      } else {
        // if check wasn't successful, pass error through to _showError function
        _showError(req, res, response.statusCode);
      }
    }
  );
}

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
}

var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry!";
  } else {
    title = status + ", something's gone wront";
    content = "Something, somewhere has gone just a little bit wrong.";
  }
  // set response status
  res.status(status);
  // send data to view
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderDetailPage = function(req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {title: locDetail.name},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and do some work.',
      callToAction: 'If you\'ve been and you like it - or you don\'t - please leave a review to help other people just like you.'
    },
    location: locDetail
  });
};

var renderReviewForm = function(req, res, locDetail) {
  res.render('location-review-form', {
     title: 'Review ' + locDetail.name + 'on Loc8r',
     pageHeader: { title: 'Review ' + locDetail.name},
     error: req.query.err,
     url: req.originalUrl
   });
};


module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postdata;
  // get location ID from URL to construct API URL
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + '/reviews';
  // Create data object to send to API using submitted form data
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  // Set request options, including path, setting POST method and passing
  // submitted form data into json parameter
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  }

  // check that no required data fields are falsey
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/review/new?err=val');
  } else {
    // make the request
    request(
      requestOptions,
      function(err, response, body) {
        // redirect to Details page if review was added successfully ...
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        }
        // check to see if status is 400, if body has name, and if that name
        // is ValidationError
        else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
          // redirect to review form, passing an error flag in query string
          res.redirect('/location/' + locationid + '/review/new?err=val');
        }
        // ... or show an error page if API returned an error
        else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};
