var mongoose = require( 'mongoose' );

var openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: String,
  closing: String,
  closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
  author: String,
  rating: {type: Number, rquired: true, min:0, max: 5},
  reviewText: String,
  createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, "default": 0, min: 0, max: 5},
  facilities: [String],
  //use 2dsphere to add support for GeoJSON longitute and latitude pairs
  coords: {type: [Number], index: `2dsphere`},
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);
