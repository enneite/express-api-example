var index = require('../routes/index');
var users = require('../routes/users');
var auth = require('../routes/auth');

var authMiddleware = require('../middlewares/authorization');

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
    app.use('/users', authMiddleware.authentification);
    
    // routing users :
    app.use('/users', users);
    
    /*
     * auth routing
     */
    app.use('/auth', auth);
    
}

var initRoutes = module.exports = exports = new InitRoutes;