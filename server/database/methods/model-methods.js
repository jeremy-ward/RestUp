/* custom methods for models
see http://mongoosejs.com..... for details*/

module.exports=function(schema){
  //=== find active ===============
  schema.statics.findActive = function(cb){
    return this.find({active: true}, cb);
  };

  //=== find by search term =======
  schema.statics.findByTerm = function(searchTerm, cb){
    var term = new RegExp(searchTerm, "i");
    return this.find({
      $and: [
        {active: true},
        {$or: [
          {title: term},
          {desc : term}
        ]}
    ]}, cb);
  };
  
};
