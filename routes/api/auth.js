var express = require('express');
var router = express.Router();

var AuthController = require('../../controllers/api/auth-controller');

/**
 * authentication of an user
 */
router.post('/', AuthController.indexAction);

module.exports = router;