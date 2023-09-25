const express = require('express');
const keys = require('./config/keys.js');

const app = express();

const moogoose = require('mongoose');
moogoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Routes
app.get('/auth', async (req, res) => {
    console.log(req.query);
    res.send("hello" + req.query.userId + "this is " + Date.now());
});

const port = 1234;
app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});