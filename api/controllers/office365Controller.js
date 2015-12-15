var office365Helper = require('../../domain/security/office365Helper');
var OAuthAccessToken = require('../../domain/models/oauth_access_token');
var OAuthClient = require('../../domain/models/oauth_client');
var User = require('../../domain/models/user');
var url = require("url");
var Promise = require("q");
var querystring = require("querystring");

module.exports = {
  grant: grant,
  getAuthUrl: getAuthUrl
}

function getAuthUrl(request, response) {
  response.send(office365Helper.getAuthUrl());
}

function grant(request, response){
  var url_parts = url.parse(request.url, true);
  var code = url_parts.query.code;
  var userInformation = null;
  var authUser = null;
  var accessToken = null;

  office365Helper.getTokenFromCode(code)
  .then(function(data){
    accessToken = data.token.access_token;
    userInformation = office365Helper.getUserInformationsFromIdToken(data.token.id_token);
    return getUser(userInformation);
  })
  .then(function (user){
    authUser = user;
    return getOAuthClient();
  })
  .then(function (client) {
    return createUserAuthentication(authUser, client, accessToken)
  })
  .then(function (client) {
    var qs = querystring.stringify({
      token: accessToken,
      username: authUser.username
    });
    response.redirect('/#/?' + qs);
  })
  .catch(function(err){
    response.redirect('/#/?error=' + err);
  });
}

function getUser(userInformation){
  var deferred = Promise.defer();

  userInformation.preferred_username = userInformation.preferred_username.toLowerCase();
  User.findOne({username: userInformation.preferred_username}, function(err, user){
    if(err){
      deferred.reject(err);
      return;
    }

    if(user){
      deferred.resolve(user);
    } else{
      var user = new User({
          username: userInformation.preferred_username,
          isResponsible: false,
          azure: {
            id: userInformation.oid,
            token: userInformation.sub,
            email: userInformation.preferred_username,
            name: userInformation.name
          }
      });

      user.save(function(err){
        if(err){
          deferred.reject(err);
          return;
        }
        deferred.resolve(user);
      });
    }
  });
  return deferred.promise;
}

function getOAuthClient(){
  var deferred = Promise.defer();
  OAuthClient.findOne(function(err, client){
    if(err){
      deferred.reject(err);
      return;
    }

    if(!client){
      deferred.reject("There aren't any OAuthClient to authorize.");
      return;
    }

    deferred.resolve(client);
  });

  return deferred.promise;
}

function createUserAuthentication(user, client, accessToken){
  var deferred = Promise.defer();

  var expires = new Date();
  expires.setSeconds(expires.getSeconds() + 3600);

  var oauthAccessToken = new OAuthAccessToken({
    access_token: accessToken,
    client_id: client.client_id,
    user: user._id,
    expires: expires
  });

  oauthAccessToken.save(function (err) {
    if(err){
      deferred.reject(err);
      return;
    }
    deferred.resolve(oauthAccessToken);
  });

  return deferred.promise;
}
