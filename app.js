var express        = require('express'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    app            = express(),
    mongoose       = require('mongoose'),
    port           = process.env.PORT || 2015;

    apiBuilder     = require('./api-builder'),
    database       = require('./server/config/database');

mongoose.connect(database.url);
// CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function () {  
    console.log('DB connected: ' + database.url);
  }); 

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('DB error: ' + err);
  }); 

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

apiBuilder(app);

app.listen(port);

console.log("app up and listening on port", port);