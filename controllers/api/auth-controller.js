var LoginEventEmitter = require('../../events/login');
var User = require('../../models/user');

/**
 * authentification controller 
 */
var AuthController = function() {
	
}

/**
 * the authentification on an user with username (email) and password  
 * 
 * @param req
 * @param res
 */
AuthController.prototype.indexAction = function (req, res) {
	
	// build log in event 
	var loginEventEmitter = LoginEventEmitter.create(req, res);	
	
	var data = req.body;	
	
	// check request params existence
	if(data['username'] == undefined || data['pwd'] == undefined) {
		loginEventEmitter.emit('ko', 'bad request (missing username or password)');
	}
	else { // request he mongodb database :
		User.find({username : data.username}, function(err, docs) {
			if(err) {
				loginEventEmitter.emit('ko', 'technical error : '+ error.message);	
			}
			else {
				if (docs.length == 0) { // no user found for this username
					loginEventEmitter.emit('ko', 'no user found for username'+ data.username);					
				}
				else if(docs.length > 1) { // to many users found for this user name					
					loginEventEmitter.emit('ko', 'to many users found for username'+ data.username);
				}
				else { // authentication success!
					var actual = docs[0];
					var cryptPwd = User.cryptPwd(data.pwd);
					if(cryptPwd == actual.pwd) {
						// emit 'ok' event with user ID in args (for token "session" storage):
						loginEventEmitter.emit('ok', actual._id);
					}
					else {
						loginEventEmitter.emit('ko', 'check pwd failed, given :'+ data.pwd + ', crypted : '+ cryptPwd, ', excepted :' + actual.pwd);						
					}					
				}
			}
		});
	}
};

var authController = module.exports = exports = new AuthController();