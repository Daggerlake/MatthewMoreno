/* GET 'home' page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.",
    locations: [{
      name: 'Oppenheimer Cafe',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '100m'
    },{
      name: 'Cafe Hero',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 4,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '200m'
    },{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 2,
      facilities: ['Food', 'Premium wifi'],
      distance: '250m'
    }]
  });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
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
  res.render('location-review-form', { title: 'Add review' });
};
