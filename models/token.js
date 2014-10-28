var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId
    , crypto = require('crypto');
/**
 * "session" storage in mongodb document
 */
var tokenSchema = new Schema({
	
	access_token :{type: String, required : true},
	expiration   : {type: Date},
	infos : {
		username : {type: String},
		id : {type: String}
	}
});


module.exports = exports = mongoose.model('Token', tokenSchema);