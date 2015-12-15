var OAuthAccessToken = require('../models/oauth_access_token');
var OAuthClient = require('../models/oauth_client');
var User = require('../models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports = {
  getAccessToken: getAccessToken,
  getLoggedUser: getLoggedUser,
  getClient: getClient,
  grantTypeAllowed: grantTypeAllowed,
  saveAccessToken: saveAccessToken,
  getUser: getUser,
  generateHash: generateHash,
  validPassword: validPassword,
  authorizeResponsible: authorizeResponsible
}

function getAccessToken(bearerToken, callback) {
  OAuthAccessToken.findOne({ access_token: bearerToken }, callback);
}

function getLoggedUser(bearerToken, callback) {
  return OAuthAccessToken.findOne({ access_token: bearerToken }, callback).lean().populate('user');
}

function getClient(clientId, clientSecret, callback) {
  OAuthClient.findOne({ client_id: clientId, client_secret: clientSecret}, callback);
}

function grantTypeAllowed(clientId, grantType, callback) {
  if (grantType === 'password') {
    return callback(false, true);
  }
}

function saveAccessToken(token, clientId, expires, userId, callback) {
  var accessToken = new OAuthAccessToken({
    access_token: token,
    client_id: clientId,
    user: userId,
    expires: expires
  });

  accessToken.save(callback);
}

function getUser(username, password, callback) {
  User.findOne({ username: username.toLowerCase() }, function(err, user) {
    if(err) return callback(err);

    if(!user){
      return callback('Invalid username');
    }

    if(!validPassword(password, user)){
      return callback('Invalid password');
    }

    callback(null, user._id);
  });
}

function authorizeResponsible(request, response, next){
  if(request.user.isResponsible){
    next();
  } else {
    response.status(403).send({message: 'The logged user is not the application responsible.'});
  }
}

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword(password, user) {
  return bcrypt.compareSync(password, user.password);
}
