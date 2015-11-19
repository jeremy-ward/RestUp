var apiBuilder = require('./api-builder'),
    morgan     = require('morgan');

apiBuilder.set('dbUrl', "mongodb://localhost:27017/test");
apiBuilder.use(morgan('dev'));
apiBuilder.start();