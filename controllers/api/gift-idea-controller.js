var GiftIdea = require('../../models/gift-idea');
var Wishlist = require('../../models/wishlist');
var User = require('../../models/user');

var GiftIdeaController = function () {
	
};


GiftIdeaController.prototype.createGiftIdeaAction = function (req, res) {
	var data = req.body;
	
	var giftIdea = new GiftIdea({
		wishlist : req.wishlist,
		name : data.name,
		price : {
			currency : 'EUR',
			amount : data.price.amount
		}
	});
	
	giftIdea.save(function (err, giftIdea) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json(giftIdea);
		}
	}); 
};

GiftIdeaController.prototype.updateGiftIdeaAction = function (req, res) {
	
	var data = req.body;
	
	req.giftIdea.name = data.name;
	req.giftIdea.price = {
			"currency" : "EUR",
			"amount" : data.price.amount
	};
	
	req.giftIdea.save(function (err, giftIdea) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json(giftIdea);
		}
	}); 
};

GiftIdeaController.prototype.deleteGiftIdeaAction = function (req, res) {
	var id = req.params['id'];	
	GiftIdea.remove({_id : id}, function (err) {
		if(err) {
			res.json(500, {error : errorMsg});
    	}
		else {
			res.json({status : 'ok', 'message' : 'gift idea succefully removed!'});
		}
	});
};

GiftIdeaController.prototype.readGiftIdeaAction = function (req, res) {
	return res.json(req.giftIdea);
};


var giftIdeaController = module.exports = exports = new GiftIdeaController();