var index = require('./index');
var users = require('./api/users');
var auth = require('./api/auth');

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');
var Token = require('../models/token');

/**
 * Initialize the route of application
 */
var InitRoutes = function() {

}

/**
 * passport use initialize 
 */
InitRoutes.prototype.passportInit = function() {
	passport.use(new BearerStrategy(
			  function(token, done) {			    
				  Token.findOne({access_token : token, expiration : {$gt : new Date()} })
	 		      .exec(function(err, doc) {
	     			if(err) {
	     				return done(err);      				
	     			}
	     			else if(doc == null) {
	     				return done(null, false);
	     			}
	     			else {     				
	     				var user = new User({
	     					username : doc.infos.username,
	     					_id : doc.infos.id
	     				});
	     				return done(null, user, { scope: 'all' });        				
	     			} 
	 		    });
			  }
			));
};

/**
 * int application routing with routers and middlewares ...
 * 
 * @param app
 */
InitRoutes.prototype.init = function (app) {
     
	/*
	 * init passport Bearer use configuration
	 */
	this.passportInit();
	var authMdw = passport.authenticate('bearer', { session: false });
	/*
	 * index routing
	 */
	app.use('/', index);

	/*
	 * user routing
	 */
    // middleware on users route : check authentification ...
    app.use('/users', authMdw);
    
    // routing users :
    app.use('/users', users);
    
    /*
     * auth routing
     */
    app.use('/auth', auth);
    
}

var initRoutes = module.exports = exports = new InitRoutes;