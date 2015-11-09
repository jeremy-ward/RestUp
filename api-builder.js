//file builds apis based on models in ./server/database/models
var fs  = require('fs'),
    API = require('./server/api/rest-api');

module.exports=function(app){

  var modelDir = './server/database/models',
      models = fs.readdirSync(modelDir);
  models.forEach(function(model){
    var curModel = require(modelDir+'/'+model),
        apiRoute = "/api/"+curModel.name;
    app.use(apiRoute, API(curModel.name));
  });
};