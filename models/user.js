var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId
    , crypto = require('crypto');

var userSchema = new Schema({
    createdDate: {type: Date, default: Date.now},
    username: {type: String, required: true, unique: true},
    pwd: {type: String, required: true},
    birthday: {type: Date, required: false},
    status: {type: String, default:'WAITING'}
});

userSchema.statics.getStatusWaiting = function() {
	return 'WAITING';
}

var cryptPwd = function(pwd) {
	var salt = 'UNGRAINDESELCOMMEJELESAIME';
	var hash = crypto.createHash('sha512');
	return  hash.update(pwd + salt).digest('base64');
}
userSchema.statics.cryptPwd = cryptPwd;

userSchema.methods.cryptPwd = function() {
	this.pwd = cryptPwd(this.pwd);	
}

module.exports = exports = mongoose.model('User', userSchema);