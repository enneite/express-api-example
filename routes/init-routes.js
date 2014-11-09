var index = require('./index');
var users = require('./api/users');
var account = require('./api/account');
var auth = require('./api/auth');

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');
var Token = require('../models/token');

var AccountMiddleware = require('../middlewares/account-middleware');

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
	var authMdw = passport.authenticate('bearer', { session: false });
	return authMdw;
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
	var authMdw = this.passportInit();
	
	
	/*
	 * index routing
	 */
	app.use('/', index);

	/*
	 * user routing
	 */
    // middleware on users route : check authentification ...
    app.use('/api/users', authMdw);    
    app.use('/api/users', users);
    
    /*
     * wishlist routing
     */
    // auth middleware
    app.use('/api/account', authMdw); 
    // acl middlewares :
    app.use('/api/account/wishlists/:id', AccountMiddleware.wishlistUpdate);
    
    // the routing :
    app.use('/api/account', account);
    
    /*
     * auth routing
     */
    app.use('/api/auth', auth);
    
    
    
}

var initRoutes = module.exports = exports = new InitRoutes;