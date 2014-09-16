var index = require('../routes/index');
var users = require('../routes/users');


var InitRoutes = function() {

}

InitRoutes.prototype.init = function (app) {
    app.use('/', index);


    // middleware on users route :
    app.use('/users', function(req, res, next){
        console.log('users/ : %s %s', req.method, req.url, req.body);
        next();
    });
    // routing users :
    app.use('/users', users);
}

var initRoutes = module.exports = exports = new InitRoutes;