var Wishlist = require('../../models/wishlist');
var User = require('../../models/user');

/**
 * wishlist controller
 */
var WishlistController = function () {
	
};

/**
 * 
 * list connected user wishlists
 * 
 * @param req
 * @param res
 */
WishlistController.prototype.userWishlistsAction = function (req, res) {
	Wishlist.find({author : {_id : req.user._id}})
	        .sort({createdDate : -1})
	        .exec(function(err, wishlists) {
	        	if(err) {
	        		res.json({'error' : 'an error occured!'});
	        	}
	        	else {
	        		res.json(wishlists);
	        	}
	        });
};

/**
 * create wishlist for the connected user
 * 
 * @param req
 * @param res
 */
WishlistController.prototype.createUserWishlistAction = function (req, res) {
	var data = req.body;
	
	var wishlist = new Wishlist({
		author : req.user,
		title : data.title,
		status : Wishlist.getStatusWaiting()
	});
	
	wishlist.save(function (err, wishlist) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json(wishlist);
		}
	}); 
};

/**
 * delete wishlist for the connected user
 * 
 * @param req
 * @param res
 */
WishlistController.prototype.deleteUserWishlistAction = function (req, res) {
	var id = req.params['id'];	
	Wishlist.remove({_id : id}, function (err) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json({status : 'ok', 'message' : 'wishlist succefully removed!'});
		}
	});
};


/**
 * update wishlist for the connected user
 * 
 * @param req
 * @param res
 */
WishlistController.prototype.updateUserWishlistAction = function (req, res) {
	
	// new values for wishlist :
	req.wishlist.title = req.body.title;
	
	req.wishlist.save(function (err, wishlist) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json(req.wishlist);
		}
	}); 
	
};

/**
 * update wishlist for the connected user
 * 
 * @param req
 * @param res
 */
WishlistController.prototype.readUserWishlistAction = function (req, res) {		
	res.json(req.wishlist);	
};


/**
 * 
 */
var wishlistController = module.exports = exports = new WishlistController();
