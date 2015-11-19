//=== example model for customer data =============================

//===get the needed tools
var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    validators = require('../server/validators'); //use if you want to add DB validators

//===Set up the customer schema
var exampleSchema = new Schema({
  active: {type: Boolean, default: true},
  title: String,
  desc: String,
  email: {type: String, validate: validators.email}
});

//=== include custom methods for customer schema
  require('../server/model-methods.js')(exampleSchema);

//==export client model
module.exports={
  name : 'example', //name should match the string you pass into mongoose.model below
  model: mongoose.model("example", exampleSchema)
};