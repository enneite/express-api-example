var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId
    , crypto = require('crypto');

var userSchema = new Schema({
    createdDate: {type: Date, default: Date.now},
    username: {type: String, required: true},
    pwd: {type: String, required: true},
    birthday: {type: Date, required: false},
    status: {type: String, default:'WAITING'}
});

userSchema.statics.getStatusWaiting = function() {
	return 'WAITING';
}

userSchema.methods.cryptPwd = function() {
	var salt = 'UNGRAINDESELCOMMEJELESAIME';
	var hash = crypto.createHash('sha512');
	this.pwd = hash.update(this.pwd + salt).digest('base64');;	
}

module.exports = exports = mongoose.model('User', userSchema);