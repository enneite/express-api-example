var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var GiftIdea = require('./gift-idea');

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

wishlistSchema.statics.getStatusWaiting = function() {
	return 'WAITING';
}

/**
 * removing gift idea associated with this wishlist
 */
wishlistSchema.pre('remove', function(next) {
    GiftIdea.remove({wishlist: {_id : this._id}}).exec(function(err) {
    	if(err) {
    		return next(err);
    	}
    	else {
    		next();
    	}
    });
    
});


module.exports = exports = mongoose.model('Wishlist', wishlistSchema);