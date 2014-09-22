var index = require('../routes/index');
var users = require('../routes/users');
var auth = require('../routes/auth');


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
    // middleware on users route :
    app.use('/users', function(req, res, next){
        console.log('users/ : %s %s', req.method, req.url, req.body);
        next();
    });
    
    // routing users :
    app.use('/users', users);
    
    /*
     * auth routing
     */
    app.use('/auth', auth);
}

var initRoutes = module.exports = exports = new InitRoutes;