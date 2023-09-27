const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    moviename: String,
    //parentsGuide: String,
    //length: String,
    //info: String,

});

mongoose.model('movies', movieSchema);