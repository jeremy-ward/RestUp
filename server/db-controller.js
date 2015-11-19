var Models     = require('./Models'),
    popOpt     = require('./popOptions'),
    errHandler = require('./error-handler'); 
module.exports = function(dbName){
  //===DEV only--prints db collection to console
  this.printDb = function(){
    console.log(dbName);
  };
  //===find all active 
  this.findActive = function(term, cb){
    if(!term){
      Models[dbName].findActive(function(err, docs){
        if(err) return cb(errHandler.database.error(err));
        if(popOpt[dbName]){
          Models[dbName].populate(docs, popOpt[dbName], function(err,docs){
            if(err) return cb(errHandler.database.error(err));
            return cb(docs);
          });
        }
        else{
          return cb(docs);}
      });
    }
    else{
      Models[dbName].findByTerm(term, 
      function(err, docs){
        if(err) return cb(errHandler.database.error(err));
        return cb(docs);
      });
    }
  };
  //===find one by ID
  this.findOne = function(id, cb){
    Models[dbName].findById(id,
      function(err, doc){
        if(err) return cb(errHandler.database.error(err));
        if(popOpt[dbName]){
          Models[dbName].populate(doc, popOpt[dbName], function(err,doc){
            if(err) return cb(errHandler.database.error(err));
            return cb(doc);
          });
        }
        else{
          return cb(doc);}
      });
  };
  //===add a new one to database
  this.addOne = function(data, cb){
    Models[dbName].create(data, 
      function(err,doc){
        if(err) return cb(errHandler.database.error(err));
        return cb(doc);
      });
  };
  //===update one's data
  this.updateOne= function(id, data, cb){
    Models[dbName].findByIdAndUpdate(id
      , data
      , {'new' : true}
      , function(err, doc){
          if(err) return cb(errHandler.database.error(err));
          return cb(doc);
      });
  };
  //===Delete one by inactivating or hard delete
  this.deleteOne = function(id, hard, cb){
    if(!hard){
      Models[dbName].findByIdAndUpdate(id
        , {active:false}
        , {'new':true}
        , function(err, doc){
            if(err) return cb(errHandler.database.error(err));
            return cb(doc);
        });
    }
    else{
      Models[dbName].findByIdAndRemove(id
        , function(err, doc){
          if(err) return cb(errHandler.database.error(err));
          return cb({"_id": doc._id, "deleted": true});
        }
      );
    }
  };
};