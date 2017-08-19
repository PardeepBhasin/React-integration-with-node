// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/AirtelDB");
 
autoIncrement.initialize(connection);

// set up a mongoose model and pass it using module.exports
var dataSchema = new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean,
    userId: {type: Number, ref: 'userId'},
}, { collection: 'user' });

dataSchema.plugin(autoIncrement.plugin, 'userId');

module.exports = mongoose.model('user', dataSchema, 'user');