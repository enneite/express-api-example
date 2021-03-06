var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var GiftIdea = require('./gift-idea');



var statusValidator = function(status) {
	return (["WAITING", "PUBLIC", "REMOVED"].indexOf(status) > -1);
}


var wishlistSchema = new Schema({
	author : {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdDate: {type: Date, default: Date.now},
    title: {type: String, required: true},    
    status: {type: String, default:'WAITING', validate : statusValidator},
    dueDate: {type: Date, required:false}
});

wishlistSchema.statics.getStatusWaiting = function() {
	return 'WAITING';
}

/**
 * removing gift idea associated with this wishlist
 */
wishlistSchema.pre('remove', function (next) {
	  console.log('remove wishlist in cascade', this._id);
	  console.log('id', this._id);
	  GiftIdea.remove({wishlist: {_id : this._id}}).exec(function (err) {
		  if(err) {
			  return next(err);
		  }
		  else {
			  next();
		  }
	  });
	  
});



module.exports = exports = mongoose.model('Wishlist', wishlistSchema);