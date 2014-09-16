var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {

  User.find(function(err, users) {
      if(err) {
          console.log(err.message);
          res.send('an error occured' + err.message);
      }
      else {
          res.json(users);
      }
  });

});




router.post('/', function(req, res) {
	var data = req.body;
	data.birthday = null;
	
	
	var user = new User({
		username: data.username,
		pwd: data.pwd,
		birthday: data.birthday,
		status: User.getStatusWaiting()
	});
	user.cryptPwd();
	
	user.save(function(err, user) {
		if(err) {
			console.log(err);
			res.json(500, {error : 'user not created!'})
		}
		res.json(user);
		
	});
	
	 
	
	
});

module.exports = router;
