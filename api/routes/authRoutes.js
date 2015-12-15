var router = require('express').Router();
var oauthserver = require('oauth2-server');
var controller = require('../controllers/office365Controller');

var oauth = oauthserver({
  model: require('../../domain/security/oauth'),
  grants: ['password'],
  debug: false
});

router.all('/token', oauth.grant());
router.all('/authorize/o365', controller.grant);
router.get('/authorize/o365/url', controller.getAuthUrl);

router.oauth = oauth;
module.exports = router;
