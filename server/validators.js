//=== shared validation functions

module.exports={
  //EXAMPLE VALIDATORS
  email : function(email){
    return /[\w\-\.]+\@\w+(\.\w+)+/i.test(email);
  },
  zip : function(zip){
    return /^(\d{5})(\-\d{4})?$/.test(zip);
  },
  phone : function(phone){
    return/^(\d{3}\-){2}\d{4}/.test(phone);
  }
};