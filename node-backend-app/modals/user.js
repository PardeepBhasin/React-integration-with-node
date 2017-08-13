// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var dataSchema = new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
}, { collection: 'user' });

module.exports = mongoose.model('user', dataSchema, 'user');