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

    JerAPI         = {};

  //Required express middleware
    app.use(bodyParser.json()); //REQUIRED
    app.use(bodyParser.urlencoded({ extended: false })); //REQUIRED
    app.use(methodOverride()); 

  //default configuration options
    JerAPI.port= process.env.PORT || 8080; //default port
    JerAPI.models = path.join(__dirname, "/models"); //default folder for models
    JerAPI.dbUrl = null;
    JerAPI.APIBase = "/api/"; //default api url base
    
  /* set value of provided property
    properities could be:
      - port
      - models
      - dbUrl
      - APIBase
    */
    JerAPI.set = function(prop, val){
      this[prop]=val;
    };

  //pass user provided middleware to Express for use
    JerAPI.use = function(middleware){
      app.use(middleware);
    };

  //start the API with port
  JerAPI.start = function(port){
    console.log('starting up your API');
    this.connect(); //connect to MongoDB database
    this.api(); //set up express routes for models
    app.listen(port||this.port);//uses user provided port or default port if not provided
    console.log('app listing on', port);  
  };
  //turn logging on
  //connect to provided MongoDB database
    JerAPI.connect = function(){
    //If user has not specificied database url throws error
      if(!this.dbUrl){
        throw new Error ("no database url provided \n set using .set('dbUrl', [db_url])\n");
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

    //loop through all models and use them in the api
    JerAPI.api = function(){
      var models = fs.readdirSync(this.models);
      for(var i=0, x=models.length;i<x;i++){
        var curModel = require(this.models +'/'+models[i]);
        app.use(this.APIBase+curModel.name, API(curModel.name, this.models));
      }
    };
module.exports=JerAPI;