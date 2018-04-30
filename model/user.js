var mongoose = require('mongoose');
var schema = require('../userSchema');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User', schema.UserSchema);

module.exports.createNewUser = function (data, cb) {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(data.password, salt, function (err, hash) {
            data.password = hash;
            User.create(data, function (err, dataa) {
                cb(err, dataa);
            }); 
        });
    });


     
}

module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}


module.exports.findById = function (id, callback) {
    User.findById(id, callback);
}