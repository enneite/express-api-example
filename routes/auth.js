var express = require('express');
var router = express.Router();

var LoginEventEmitter = require('../events/login');

var User = require('../models/user');

/**
 * authentication of an user
 */
router.post('/', function (req, res) {
	
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
						loginEventEmitter.emit('ok');
					}
					else {
						loginEventEmitter.emit('ko', 'check pwd failed, given :'+ data.pwd + ', crypted : '+ cryptPwd, ', excepted :' + actual.pwd);						
					}					
				}
			}
		});
	}
});

module.exports = router;