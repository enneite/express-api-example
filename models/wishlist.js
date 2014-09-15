var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var wishlistSchema = new Schema({
	author : {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdDate: {type: Date, default: Date.now},
    title: {type: String, required: true},    
    status: {type: String, default:'WAITING'},
    dueDate: {type: Date, required:false}
});

module.exports = exports = mongoose.model('Wishlist', wishlistSchema);