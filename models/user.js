var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    createdDate: {type: Date, default: Date.now},
    username: {type: String, required: true},
    pwd: {type: String, required: true},
    birthday: {type: Date, required: false},
    status: {type: String, default:'WAITING'}
});

module.exports = exports = mongoose.model('User', userSchema);