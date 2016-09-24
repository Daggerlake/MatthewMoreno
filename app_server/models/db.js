var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// close Mongoose connection, passing through an anonymous function to run
// when closed
// arguments: message and callback function
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
  // send message to gracefulShutdown and callback to
  // kill process, emitting SIGUSR2 again
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
  // send message to gracefulShutdown and callback to exit Node process
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function () {
  // send message to gracefulShutdown and callback to exit Node process
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./locations');
