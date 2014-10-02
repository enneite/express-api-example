
var User = require('../models/user');
var Token = require('../models/token');

var AuthMiddleware = function() {
	
}

AuthMiddleware.prototype.authentification = function(req, res, next){
	var token = null;
    var headers = req.headers;
    var authorization = headers['authorization'];
    if(authorization != undefined) {
    	var matches = authorization.match(/^Bearer ([0-9A-Z]+)$/i);
    	if(matches !=null) {
    		var now = new Date();
    		token = matches[1];
    		console.log('token found', token);
    		Token.findOne({access_token : token, expiration : {$gt : new Date()} })
    		     .exec(function(err, doc) {
        			if(err) {
        				res.status(401).send('authorization server error');       				
        			}
        			else if(doc == null) {
        				console.log('auth failde unvalid token');
        				res.status(401).send('Not authorized');
        			}
        			else { 
        				
        				/*var user = new User({
        					username : doc.infos.username
        				});
        				req.user = user;*/
        				next();        				
        			}
    		});
    	}
    	else {
    		res.status(401).send('Not authorized (Authorization Bearer needed)');
    	}
    }
    else {
		res.status(401).send('Not authorized (aauthorization header not found)');
	}
};

var authMiddleware = module.exports = exports = new AuthMiddleware();