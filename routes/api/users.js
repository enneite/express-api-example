var express = require('express');
var router = express.Router();

var UserController = require('../../controllers/api/user-controller');

var passport = require('passport');

/**
 * get users list
 */
router.get('/', UserController.listAction);

/**
 * get user by id and return some properties as json
 */
router.get('/:id', UserController.readAction);

/**
 * update an user
 */
router.put('/:id', UserController.updateAction);

/**
 * create an new user !
 */
router.post('/', UserController.createAction);



module.exports = router;
