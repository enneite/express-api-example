var Wishlist = require('../models/wishlist');
var GiftIdea = require('../models/gift-idea');

var AccountMiddleware = function() {
	
};

/**
 * private function used to verify if a wiqhist is associated with an connected user
 */
var wishlistMdw = function (req, res, next, id) {
		
	Wishlist.findById(id, function (err, found) {
		
		  if(err) {
			  res.status(500).send('an error occured!');
		  }
		  else if(null == found) {
			  res.status(404).send('wishlist Not found');
		  }
		  else {
			  // string formating for ObjectId
			  if(("" + found.author) == ("" + req.user._id)) {
				  
				  req.wishlist = found;
				  
				  next();
			  }
			  else { 
				  res.status(401).send('acces to this wishlist is not authorized');
			  }
		  }
	});	
}

/**
 * wishlist middleware
 * updating or removing a wishlist  is autorize for his author
 * 
 * @param req
 * @param res
 * @param next
 */
AccountMiddleware.prototype.wishlistMdw = function (req, res, next) {
	var id = req.params['id'];	
	wishlistMdw(req, res, next, id);
}

/**
 * gift idea acl middleware
 * 
 * @param req
 * @param res
 * @param next
 */
AccountMiddleware.prototype.wishlistGiftIdeaMdw = function (req, res, next) {
	var id = req.body.wishlist;
	// apply this middleware only if create a new git idea :
	if(req.method == 'POST') {
		wishlistMdw(req, res, next, id);
	}
	else {
		next();
	}
	
}

/**
 * gift idea acl middleware 
 * crud on gift idea is authorized for the author of the wishlist
 * 
 * @param req
 * @param res
 * @param next
 */
AccountMiddleware.prototype.giftIdeaMdw = function (req, res, next) {
	
	var id = req.params['id'];
	GiftIdea.findById(id, function (err, found) {
		
		  if(err) {
			  res.status(500).send('an error occured!');
		  }
		  else if(null == found) {
			  res.status(404).send('gift idea Not found');
		  }
		  else {
			  req.giftIdea = found;
			  var wishlistId = "" + found.wishlist ;
			  wishlistMdw(req, res, next, wishlistId);
		  }
	});	
}




var accountMiddleware = module.exports = exports = new AccountMiddleware();