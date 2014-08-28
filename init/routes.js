var index = require('../routes/index');
var users = require('../routes/users');


var InitRoutes = function() {

}

InitRoutes.prototype.init = function (app) {
    app.use('/', index);
    app.use('/users', users);
}

var initRoutes = module.exports = exports = new InitRoutes;