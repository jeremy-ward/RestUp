<h1>RestUp - REST api generator</h1>

Application quickly generates an RESTful api that enables interaction with a MongoDB database.<br>
User must provide only the mongoose models to be saved in the database.  For more information on model creation see <a href ="http://mongoosejs.com/docs/guide.html" target ="_blank">Mongoose Guide</a>.
<h2>Use</h2>
To use application user simply add models for the data they wish to save to the models folder.
<h4>Example</h4>
<pre><code>
  var mongoose   = require('mongoose'),
      Schema     = mongoose.Schema;
      
  //===Set up the customer schema
  var exampleSchema = new Schema({
    active: {type: Boolean, default: true},
    title: String,
    desc: String,
    email: String,
  });

  //==expose client model for use throughout application
  module.exports={
    name : 'example', //name should match the string you pass into mongoose.model below
    model: mongoose.model("example", exampleSchema)
  };
</code></pre>