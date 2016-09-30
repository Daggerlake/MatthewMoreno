var express = require('express');
var router = express.Router();

// require controller files
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
// Define location routes and map them to controller functions
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReview);
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);
/* Other pages */
// Define other routes
router.get('/about', ctrlOthers.about);

module.exports = router;
