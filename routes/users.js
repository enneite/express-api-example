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

module.exports = router;
