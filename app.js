//==Example app.js to configure and start RestUp

var RestUp = require('./RestUp');

RestUp.set('dbUrl', "mongodb://localhost:27017/test");

RestUp.start();