
/**
 * acl (roles and resources) are configured in a json file : acl.json
 */
var aclConf = require('../configs/'+ global.APPLICATION_ENV +'/acl.json');
var acl = aclConf.acl;
/**
 * For now user roles are persisted in ajson file 
 * (in a second time, they will persisted in mongodb )
 */
var usersRoles = require('../configs/'+ global.APPLICATION_ENV +'/users-roles.json');


/**
 * @param user
 * build allowed resources for n user
 */
var buildAllowedResources = function(user) {
    var roles = usersRoles[user.username];
	var resources = [];
	for(var i in roles) {
	    resources = resources.concat(acl[roles[i]]);
        }

        return resources;
}

/**
 * 
 */
var resourcesMdwFn = function(req, res, next, resource) {
	var roles = findUserRoles(req.user);
	var resources = [];
	for(var i in roles) {
	    resources = resources.concat(acl[roles[i]]);
        }

	if(resources.indexOf(resource) >-1) {
		next();
	}
	else {
              res.status(401).send('resource not allowed ' + resource);
        }
}

var ResourceMiddleware = function() {};


/**
 * @param user
 * find user's roles
 */
var findUserRoles = function(user) {
	return usersRoles[user.username];
}


/**
 * 
 * @param req
 * @param res
 * @param next
 */
ResourceMiddleware.prototype.manageUserMdw = function(req, res, next) {
	resourcesMdwFn(req, res, next, "crud_user");
}

var resourceMiddleware = module.exports = exports = new ResourceMiddleware();
