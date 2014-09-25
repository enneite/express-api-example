var crypto = require('crypto');

var User = require('../models/user');
var Token = require('../models/token');

var EventEmitter = require('events').EventEmitter

var AuthenticationService = function() {
	
}

var createToken = function (username) {
	var max = 999999999999;
	var randomInt = Math.floor(Math.random()*max);
	var randomStr = '' + randomInt;
	var timestamp = '' + new Date().getTime();
	
	var stringToHash = username + randomStr + timestamp ;
	
	var hash = crypto.createHash('sha512');
	return  hash.update(stringToHash).digest('hex');
};

var createAndPersistToken = function(username) {
	var access_token = createToken(username);
	var d = new Date();
	d.setSeconds(30);
	var token = new Token({
		access_token : access_token,
		expiration   : d,
		infos        : {
			username : username
		}			
	});
	token.save();
	return access_token;
};


var buildLoginEvents = function(req, res) {
	var loginEventEmitter = new EventEmitter();

	// listen me when when log in pass
	loginEventEmitter.on('ok', function() {
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
					var access_token = createAndPersistToken(req.body.username);
				}
				else { // if access_token already existsreturn it 
					var now = new Date();
					
					console.log('now:', now);
					console.log('expiration:', docs[0].expiration);
					
					if(docs[0].expiration > now) {
						var access_token = docs[0].access_token;
					}
					else {
						// var query = Token.remove({ infos : { username : req.body.username}});
						// query.exec();
						var access_token = createAndPersistToken(req.body.username);												
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

AuthenticationService.prototype.login = function (req, res) {
	
	// build log in event 
	loginEventEmitter = buildLoginEvents(req, res);	
	
	var data = req.body;	
	
	// check request params existence
	if(data['username'] == undefined || data['pwd'] == undefined) {
		loginEvent.emit('ko', 'bad request (missing username or password');
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
}

var authenticationService = module.exports = exports = new AuthenticationService();