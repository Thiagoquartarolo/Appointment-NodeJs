var router = require('express').Router();
var controller = require('../controllers/userController');
var oauth = require('../../domain/security/oauth');

router.get('/users', controller.getUsers);
router.post('/users', oauth.authorizeResponsible, controller.saveUsers);

module.exports = router;
