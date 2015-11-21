<h1>RestUp - REST api generator</h1>

<p>Application quickly generates an RESTful api that enables interaction with a MongoDB database.</p>
<p>User must provide only the mongoose models to be saved in the database.  For more information on model creation see <a href ="http://mongoosejs.com/docs/guide.html" target ="_blank">Mongoose Guide</a>.</p>
<h2>Installation</h2>
<p>Type the following in the command line from the directory you wish to install it to:</p>
<pre><code>>git clone https://github.com/jeremy-ward/RestUp.git && cd RestUp
>npm install
</code></pre>
<h2>Use</h2>
<p>To use application user simply add models for the data they wish to save to the models folder and then start the application.</p>
<h4>Example Model</h4>
<pre><code>var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

  //===Set up the customer schema
  var exampleSchema = new Schema({
    active: {type: Boolean, default: true},
    title: String,
    desc: String,
    email: String,
  });

  //==expose model for use throughout application
  module.exports={
    name : 'example', //name should match the string you pass into mongoose.model below
    model: mongoose.model("example", exampleSchema)
  };
</code></pre>
<h4>Starting the App</h4>
<p>To start the app:</p> 
  <ul>
    <li>Include the RestUp into app.js file</li>
    <li>Set the url for the database</li>
    <li>Start the api</li>
  </ul>
<h5>Simplest app.js to start RestUp:</h5>
<pre><code>var apiBuilder = require('./api-builder');

apiBuilder.set('dbUrl', 'mongodb://localhost:27017/example');

apiBuilder.start();
</code></pre>
<h2>Methods</h2>
<h3><code>RestUp.set('parameter', 'value')</code></h3>
<p>Sets the value of a parameter of the application</p>
<p>Parameters available to be set:</p>
<ul>
  <li>dbUrl</li>
  <ul>
    <li>IMPORTANT: this parameter must be set for application to function.</li>
    <li>Provide a string with the entire URL for the database</li>
    <li>See <a href='http://mongoosejs.com/docs/connections.html' target='_blank'>Mongoose Connections</a> for details</li>
  </ul>
  <li>models</li>
  <ul>
    <li>Pass a string with the model folder location</li>
    <li>To ensure functionality pass using path module: <code>path.join(__dirname, 'directoryString')</code></li>
    <li>Default directory: <code>/model</code></li>
  </ul>
  <li>APIBase</li>
  <ul>
    <li>Pass a string that is the base url for the call to the api</li>
    <li>Default: <code>/api/</code></li>
    <li>Example of default: <code>localhost:PORT<em>/api/</em>model-name</code></li>
  </ul>
  <li>port</li>
  <ul>
    <li>Pass a port number for application to listen on</li>
  </ul>
</ul>
<h3><code>RestUp.use(middleware)</code></h3>
<p>Pass in middleware for use in the application. Use the same as with an <a href="http://expressjs.com/api.html#app.use" targer="_blank">ExpressJS application</a>.</p>
<h3><code>RestUp.start([port])</code></h3>
<p>Method to start the application.</p>
<p>If port number is passed application will listen on that port.  Otherwise default port is <code>process.env.PORT </code>or <code>8080</code> if no <code>process.env.PORT</code> is set.</p>
<h2>Example Use</h2>
<p><b>app.js file:</b></p>
<pre><code>var RestUp = require('./RestUp'),
    logger = require('morgan'); //access morgan library for request logging
    
    RestUp.set('dbUrl', 'mongodb://localhost:27017/example'); //set the database url

    RestUp.use(logger('dev')); //use logging middleware

    RestUp.start(3000); //start the applicaton on port 3000;
</code></pre>
<p><b>Then in the console:</b></p>
<pre><code>
  >node app.js
  Starting RestUp
  -- RestUp on port 3000 --
</code></pre>
<p>Your RESTful API is up and ready for use!</p>
