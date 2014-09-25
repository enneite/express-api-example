var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId
    , crypto = require('crypto');

var tokenSchema = new Schema({
	
	access_token :{type: String, required : true},
	expiration   : {type: Date},
	infos : {
		username : {type: String}
	}
});


module.exports = exports = mongoose.model('Token', tokenSchema);