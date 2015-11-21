//==Example app.js to configure and start RestUp

var RestUp = require('./RestUp'),
    morgan     = require('morgan');

RestUp.set('dbUrl', "mongodb://localhost:27017/test");
RestUp.use(morgan('dev'));
RestUp.start();