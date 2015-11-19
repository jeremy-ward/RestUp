/* custom methods for models
see http://mongoosejs.com..... for details*/

module.exports=function(schema){
  //=== find active ===============
  schema.statics.findActive = function(cb){
    return this.find({active: true}, cb);
  };
};
