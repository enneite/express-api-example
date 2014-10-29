var EventEmitter = require('events').EventEmitter
var crypto = require('crypto');
var nconf = require('nconf');
var User = require('../models/user');
var Token = require('../models/token');

var authConf = nconf.get('auth');
var AUTH_TIMEOUT = authConf['token-timeout'] ; //3600 * 24;
var AUTH_SALT = authConf['salt'];

/**
 * private function : generate access_token
 */
var createToken = function (username) {
	var max = 999999999999;
	var randomInt = Math.floor(Math.random()*max);
	var randomStr = '' + randomInt;
	var timestamp = '' + new Date().getTime();
	
	var stringToHash = username + randomStr + timestamp + AUTH_SALT ;
	
	var hash = crypto.createHash('sha512');
	return  hash.update(stringToHash).digest('hex');
};

/**
 * private function : create access_token and persist it in mongodb
 */
var createAndPersistToken = function(username, userId) {
	console.log('user id  (createAndPersistToken)' +userId);
	var access_token = createToken(username);
	var d = new Date();
	d.setSeconds(AUTH_TIMEOUT);
	var token = new Token({
		access_token : access_token,
		expiration   : d,
		infos        : {
			username : username,
			id : userId
		}			
	});
	token.save();
	return access_token;
};

/**
 * 
 */
var LoginEventsEmitter = function() {
	
};

/**
 * create an eventEmitter to listen when authentication append
 * 
 * @param req
 * @param res
 * @returns {EventEmitter}
 */
LoginEventsEmitter.prototype.create = function(req, res) {
	var loginEventEmitter = new EventEmitter();

	// listen me when when log in pass
	loginEventEmitter.on('ok', function(userId) {
		console.log('user id  (on())' +userId);
		// search if access_token already exists (in this case return it!)
		Token.find({ infos : { username : req.body.username}})
		     .sort({expiration : -1})
		     .exec(function(err, docs) {			
			if(err) {
				loginEvent.emit('ko', 'technical error creating token');
			}
			else {
				console.log(docs);
				// if access_token doesn't exists create it and persist it in mongodb
				if(docs.length == 0) {
					
					var access_token = createAndPersistToken(req.body.username, userId);
					console.log('token dos not exist : create new token');
				}
				else { // if access_token already exists and not expired return it 
					var now = new Date();
					
					console.log('now:', now);
					console.log('expiration:', docs[0].expiration);
					
					if(docs[0].expiration > now) {
						var access_token = docs[0].access_token;
					}
					else { // if token expired, return and new token (after remove it)
						Token.find({ infos : { username : req.body.username}}).remove().exec();
						var access_token = createAndPersistToken(req.body.username);
						console.log('token expired : create new token');
					}					
				}
			}
			res.json(200, {access_token : access_token});
		});			
	});

	// listen me when when log in failed :
	loginEventEmitter.on('ko', function(consoleMsg, errMsg) {
		console.log('ERROR AUTH : ' + consoleMsg);
		res.json(500, {error : 'authentication failed'});
	});
	
	return loginEventEmitter;
}

var loginEventsEmitter = exports = module.exports = new LoginEventsEmitter ();