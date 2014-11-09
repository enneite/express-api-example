var Wishlist = require('../models/wishlist');

var AccountMiddleware = function() {
	
};

/**
 * updating or removing a wishlist  is autorize for his author
 * 
 * @param req
 * @param res
 * @param next
 */
AccountMiddleware.prototype.wishlistUpdate = function (req, res, next) {
	var id = req.params['id'];
	
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

var accountMiddleware = module.exports = exports = new AccountMiddleware();