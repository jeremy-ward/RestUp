//=== consolidate models in one file

//=== get the models
var fs     = require('fs'),
    
    models = fs.readdirSync('./server/database/models');

models.forEach(function(model){
  var curModel = require('./models/'+model);
  module.exports[curModel.name]=curModel.model;
});