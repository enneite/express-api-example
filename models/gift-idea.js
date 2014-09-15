var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var giftIdeaSchema = new Schema({
	wishlist : {
		type: Schema.Types.ObjectId,
		ref: 'Wishlist'
	},
	createdDate: {type: Date, default: Date.now},
    name: {type: String, required: true},    
    price : {
    	currency : {type: String},
    	amount: {type: Number}
    },
    urls : {type : Array}
});

module.exports = exports = mongoose.model('GiftIdea', wishlistSchema);