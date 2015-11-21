//file builds apis based on models in ./server/database/models
var fs  = require('fs'),
    API = require('./server/rest-api'),
    express        = require('express'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    app            = express(),
    mongoose       = require('mongoose'),
    path           = require('path'),
    port           = process.env.PORT || 8080,

    RestUp         = {};

  //Required express middleware
    app.use(bodyParser.json()); //REQUIRED
    app.use(bodyParser.urlencoded({ extended: false })); //REQUIRED
    app.use(methodOverride()); 

  //default configuration options
    RestUp.port= process.env.PORT || 8080; //default port
    RestUp.models = path.join(__dirname, "/models"); //default folder for models
    RestUp.dbUrl = null;
    RestUp.APIBase = "/api/"; //default api url base
    
  /* set value of provided property
    properities could be:
      - port
      - models
      - dbUrl
      - APIBase
    */
    RestUp.set = function(prop, val){
      this[prop]=val;
    };

  //pass user provided middleware to Express for use
    RestUp.use = function(middleware){
      app.use(middleware);
    };

  //start the API with port
  RestUp.start = function(port){
    console.log('Starting RestUp');
    this.connect(); //connect to MongoDB database
    this.api(); //set up express routes for models
    port = port||this.port;
    app.listen(port||this.port);//uses user provided port or default port if not provided
    console.log('-- RestUp on port', port, "--");  
  };
  //turn logging on
  //connect to provided MongoDB database
    RestUp.connect = function(){
    //If user has not specificied database url throws error
      if(!this.dbUrl){
        throw new Error ("no database url provided \n set using .set('dbUrl', [db_url])\n");
      }
      mongoose.connect(this.dbUrl);
      // When successfully connected
        mongoose.connection.on('connected', function () {  
          
        }); 
        // If the connection throws an error 
        mongoose.connection.on('error',function (err) {  
          throw new Error('DB connection error:\n' + err);
        }); 
    };

    //loop through all models and use them in the api
    RestUp.api = function(){
      var models = fs.readdirSync(this.models);
      for(var i=0, x=models.length;i<x;i++){
        var curModel = require(this.models +'/'+models[i]);
        app.use(this.APIBase+curModel.name, API(curModel.name, this.models));
      }
    };
module.exports=RestUp;