//===Error handling methods====
module.exports={
  database : {
    error : function(err){
      if(err.name=="ValidationError"){
        return this.validation(err);
      }
      else{
        console.log("DATABASE ERROR:\n",err);
        return err.name;
      }
    },
    validation : function(err){
      console.error("DATABASE VALIDATION ERROR:\n",err);
      var errData = err.errors[Object.keys(err.errors)[0]];
      return {
        type : err.name,
        field : errData.path,
        value : errData.value
      };
    }
  }
};