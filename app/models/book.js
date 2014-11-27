var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    name      : String,
    ISBN      : String,
    category  : String,
    author    : String,

    borrowed      : Boolean,
    borrower      : Number,
    dateSignedOut : String,
    dateDue       : String,
    requests      : Array
});

module.exports = mongoose.model('physlib_books', bookSchema);