const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const config = require('./config');

const app = express();

// mongo models Appointments
// and set up

app.user(partials());

//Routes

//Start Server
app.listen(PORT, function() {
  console.log('Calendar App on Port: ' + PORT)
});
