const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String,


    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);