const express = require('express');

const app = express();

// Routes
app.get('/auth', async (req, res) => {
    console.log(req.query);
    res.send("hello" + req.query.userId + "this is " + Date.now());
});

const port = 1234;
app.listen(port, () => {
    console.log("Listening on " + port);
});