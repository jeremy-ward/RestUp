//=== consolidate models in one file

//=== get the models
var fs     = require('fs'),
    path   = require('path'),

    models = fs.readdirSync(path.join(__dirname, '../models'));//gets all models out of models folder;

//loops through models and exposes them for interaction
models.forEach(function(model){
  var curModel = require('../models/'+model);
  module.exports[curModel.name]=curModel.model;
});