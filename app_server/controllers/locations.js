var request = require('request');
var apiOptions = {
  // set default server URL for local development
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  // if application is running in production mode set different base URL;
  // change to be live address of application
  apiOptions.server = "https://glacial-beach-72033.herokuapp.com/";
}

var renderHomepage = function(req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    // if response isn't array, set responseBody to be empty array
    message = "API lookup error";
    responseBody = [];
  } else {
    // if response if array with no length
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.",
    // information from our request API
    locations: responseBody,
    message: message
  });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  // set path for API request
  var requestOptions, path;
  path = '/api/locations';
  // set request options, including URL, method, empty JSON body,
  // and query string paramaters
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    // query paramaters
    qs : {
      lng : -122.478645,
      lat : 47.260440,
      dmax : 10000,
    }
  };
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
      // only run the loop to format distances if API retuned
      // 200 status code and some data
      if (response.statusCode === 200 && data.length) {
        // loop through array, formatting distance value of location
        for (i=0; i<data.length; i++) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      // pass modified data returned by request to renderHomepage
      renderHomepage(req, res, data);
    }
  );

  var _formatDistance = function (distance) {
    var numDistance, unit;
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
  };
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
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
      // Call renderDetailPage function when API has responded
      renderDetailPage(req, res);
    }
  );
};

var renderDetailPage = function(req, res) {
  res.render('location-info', {
    title: 'Oppenheimer Cafe',
    pageHeader: {title: 'Oppenheimer Cafe'},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and do some work.',
      callToAction: 'If you\'ve been and you like it - or you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'Oppenheimer Cafe',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {lat: 47.263599, lng: -122.483337},
      openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
      },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '7:00pm',
        closed: false
      },{
        days: 'Sunday',
        closed: true
      }],
      reviews: [{
        author: 'Simon Holmes',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'what a great place. I can\'t say enough good things about it.'
      },{
        author: 'The Grizz',
        rating: 3,
        timestamp: '16 June 2013',
        reviewText: 'Meh. The coffee was expensive but hack, hack, chop, chop!'
      }]
    }
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  res.render('location-review-form', {
     title: 'Review Oppenheimer Cafe on Loc8r',
     pageHeader: { title: 'Review Oppenheimer Cafe'}
   });
};
