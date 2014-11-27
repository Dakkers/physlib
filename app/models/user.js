var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt');

var userSchema = mongoose.Schema({
    email        : String,
    password     : String,
    uwid         : String,
    name         : String,

    booksSignedOut : Array,
    booksRequested : Array
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('physlib_users', userSchema);