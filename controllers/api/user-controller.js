var User = require('../../models/user');

var UserController = function(){
	
}

/**
 * 
 * @param req
 * @param res
 */
UserController.prototype.listAction = function(req, res) {
  User.find(function(err, users) {
      if(err) {
          console.log(err.message);
          res.send('an error occured' + err.message);
      }
      else {
          res.json(users);
      }
  });
}

/**
 * 
 * @param req
 * @param res
 */
UserController.prototype.readAction = function(req, res) {	
	var id = req.params['id'];	
	User.findById(id , function(err, found) {
		if(err) {
			console.log(err);
			res.json(500, {error : 'user not found!'})
		};
		
		var data = {
				'id'       : found._id,
				'username' : found.username,
				'status'   : found.status
		};
		res.json(data)
	});
};

/**
 * 
 * @param req
 * @param res
 */
UserController.prototype.updateAction = function(req, res) {
	var id = req.params['id'];	
	User.findById(id , function(err, found) {
		if(err) {
			console.log(err);
			res.json(500, {error : 'user not found!'})
		};
		
		var data = req.body;
		
		found.save(function(err, user) {
			if(err) {
				console.log(err);
				res.json(500, {error : 'user not updated!'})
			}
		});
		
		res.json(found);
	});
}

/**
 * 
 * @param req
 * @param res
 */
UserController.prototype.createAction =function(req, res) {	
	var data = req.body;
	data.birthday = null;	
	var user = new User({
		username: data.username,
		pwd: data.pwd,
		birthday: data.birthday,
		status: User.getStatusWaiting()
	});
	// crypt user password : here
	user.cryptPwd();
	
	user.save(function(err, user) {
		if(err) {
			console.log(err);
			res.json(500, {error : 'user not created!'})
		}
		res.json(user);		
	});	
}


var userController = module.exports = exports = new UserController();

