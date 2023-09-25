const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
 
//Connect to DB
const moogoose = require('mongoose');
moogoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

//DB models
require('./model/Account');

//Routes
require('./routes/authenticationRoutes')(app);


const port = 1234;
app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});