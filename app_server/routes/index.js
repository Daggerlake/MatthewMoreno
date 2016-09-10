var express = require('express');
var router = express.Router();

// require controller files
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
// Define location routes and map them to controller functions
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);
/* Other pages */
// Define other routes
router.get('/about', ctrlOthers.about);

module.exports = router;
