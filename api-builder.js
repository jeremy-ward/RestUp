//file builds apis based on models in ./server/database/models
var fs  = require('fs'),
    API = require('./server/rest-api'),
    express        = require('express'),
    // morgan         = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    app            = express(),
    mongoose       = require('mongoose'),
    port           = process.env.PORT || 8080,

    JerAPI         = {};
  //default express middleware
    //app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());

  //default configuration options
  JerAPI.port= process.env.PORT || 8080;
  JerAPI.models = "./models";
  JerAPI.dbUrl = null;
  
  //set value of provided property
    /* properities could be:
      - port
      - models
      - dbUrl
    */
  JerAPI.set = function(prop, val){
    this[prop]=val;
  };
  //pass user provided middleware to Express for use
  JerAPI.use = function(middleware){
    app.use(middleware);
  };
  //connect to provided MongoDB database
  JerAPI.connect = function(){
    //If user has not specificied database url throws error
    if(!this.dbUrl){
      throw new Error ("no database url provided \n set using .set('dbUrl', [url])\n");
    }
    mongoose.connect(this.dbUrl);
     // When successfully connected
      mongoose.connection.on('connected', function () {  
        console.log('DB connected');
      }); 
      // If the connection throws an error 
      mongoose.connection.on('error',function (err) {  
        throw new Error('DB connection error:\n' + err);
      }); 
  };

  //start the API with port
  JerAPI.start = function(port){
    console.log('starting up your API');
    this.connect(); //connect to MongoDB database
    port = port||this.port; //uses user provided port or default port if not provided
    var models = fs.readdirSync(this.models);
    for(var i=0, x=models.length;i<x;i++){
      var curModel = require(this.models +'/'+models[i]);
      app.use("/api/"+curModel.name, API(curModel.name));
    }
    app.listen(port);
    console.log('app listing on', port);  
  };


module.exports=JerAPI;