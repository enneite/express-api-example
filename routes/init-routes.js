var index = require('./index');
var users = require('./api/users');
var auth = require('./api/auth');

var AuthMiddleware = require('../middlewares/auth-middleware');

var InitRoutes = function() {

}

InitRoutes.prototype.init = function (app) {
    
	/*
	 * index routing
	 */
	app.use('/', index);

	/*
	 * user routing
	 */
    // middleware on users route : check authentification ...
    app.use('/users', AuthMiddleware.authentification);
    
    // routing users :
    app.use('/users', users);
    
    /*
     * auth routing
     */
    app.use('/auth', auth);
    
}

var initRoutes = module.exports = exports = new InitRoutes;