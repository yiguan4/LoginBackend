const express = require('express');
const keys = require('./config/keys.js');

const app = express();

// DB
const moogoose = require('mongoose');
moogoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// DB models
require('./model/Account');
const Account = moogoose.model('accounts');

// Routes
app.get('/account', async (req, res) => {
    const { cUsername, cPassword } = req.query;

    if(cUsername == null || cPassword == null){
        res.send("Invalid credentials");
        return;
    }

    var userAccount = await Account.findOne({ username : cUsername});
    if(userAccount == null){
        console.log("Create new account");

        var newAccount = new Account({
            username : cUsername,
            password : cPassword,

            lastAuthentication : Date.now()
        });

        await newAccount.save();

        res.send(newAccount);
        return;
    }else{
        if(cPassword == userAccount.password){
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();
            
            console.log("retrieving ")
            res.send(userAccount);
            return;
        }
    }

    res.send('hello');
});

const port = 1234;
app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});