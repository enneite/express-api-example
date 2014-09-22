var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../models/user');

/**
 * authentication of an user
 */
router.post('/', function (req, res) {
	var data = req.body;
	
	var status = 500;
	var message = '';
	var token = null;
	
	// check request params existence
	if(data['username'] == undefined || data['pwd'] == undefined) {
		console.log('AUTH : Bad request', data);
		message = 'auth failed';
		res.json(500, {error : message});
	}
	else { // request he mongodb database :
		User.find({username : data.username}, function(err, docs) {
			if(err) {
				console.log('AUTH : technical error', err);
				message = 'auth failed';
				res.json(500, {error : message});
			}
			else {
				if (docs.length == 0) { // no user found for this username
					console.log('AUTH : no user found for username', data.username);
					message = 'auth failed';
					res.json(500, {error : message});
				}
				else if(docs.length > 1) { // to many users found for this user name
					console.log('AUTH : to many users found for username', data.username);
					message = 'auth failed';
					res.json(500, {error : message});
				}
				else { // authentication success!
					var actual = docs[0];
					var cryptPwd = User.cryptPwd(data.pwd);
					if(cryptPwd == actual.pwd) {
						status = 200;
						
						var createToken = function (username) {
							var max = 999999999999;
							var randomInt = Math.floor(Math.random()*max);
							var randomStr = '' + randomInt;
							var timestamp = '' + new Date().getTime();
							
							var stringToHash = username + randomStr + timestamp ;
							
							var hash = crypto.createHash('sha512');
							return  hash.update(stringToHash).digest('hex');
						}
						token = createToken(data.username);
						
						res.json(200, {access_token : token});
					}
					else {
						console.log('check pwd failed, given :', data.pwd, 'crypted :', cryptPwd, 'excepted :', actual.pwd);
						message = 'auth failed';
						res.json(500, {error : message});
					}					
				}
			}
		});
	}
});

module.exports = router;