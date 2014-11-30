"use strict";

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt');

var userSchema = mongoose.Schema({
    email        : {type: String, unique: true, lowercase: true},
    password     : String,
    uwid         : {type: Number, unique: true},
    name         : String,

    booksSignedOut : [String],
    booksRequested : [String]
});

// when we save the User, we automatically generate a hash for the password
// using this way instead of creating a method for the schema allows us to pass 
// an object to the User() function in server.js, which looks prettier.
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))
		return next();

	bcrypt.genSalt(10, function(err,salt) {
		bcrypt.hash(user.password, salt, function(err,hash) {
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('physlib_users', userSchema);