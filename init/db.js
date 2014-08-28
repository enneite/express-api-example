var bootloader = require('express-bootloader');
var mongoose = require('mongoose');




var InitDb = function(){

}

InitDb.prototype.init = function(app) {
//instance of the config Loader to load config when it
// 's needed
    var configsLoader = bootloader.getLoader(__dirname +'/../configs');

    var dbConn = bootloader.getDbModule();
    dbConn.init(app, configsLoader);
}

var initDb = module.exports = exports = new InitDb;