const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
let partials = require('express-partials');
// const passport = require('passport');
const PORT = process.env.PORT || 3000;

const config = require('./config');

// INIT EXPRESS
const app = express();

//MONGODB
const mongoose = require('mongoose');
mongoose.Promise = Promise;


mongoose.connect("mongodb://localhost/calendar-app");
// mongoose.connect('mongodb://heroku_029r9jnm:qeqr4el8h0o2ge6m6v3hd35iou@ds127063.mlab.com:27063/heroku_029r9jnm');
const db = mongoose.connection;

db.on('error', function(error) {
	console.log("Mongoose error : " + error);
});

db.once('open', function() {
	console.log('Mongoose Connection Successful!');
});

// Mongo Schemas
const Appointment = require('./model/Appointments');

// //Look for static files
// app.use('/static', express.static('./server/static'));
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
// app.use(morgan('dev'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(methodOverride("_method"));

//Sessions
app.use(partials());

//Routes
require('./controllers/controller.js')(app, Appointment);


// //start server
app.listen(PORT, function() {
	console.log('Listening on port : ' + PORT);
});
