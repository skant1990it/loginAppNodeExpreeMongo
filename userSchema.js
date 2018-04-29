var mongoose = require('mongoose');

// User Schema
module.exports.UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
}, { collection: 'myloginusers' });

//commited by Ravindra

