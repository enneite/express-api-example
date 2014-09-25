var express = require('express');
var router = express.Router();

var authenticationService = require('../services/authentication');
/**
 * authentication of an user
 */
router.post('/', authenticationService.login);

module.exports = router;