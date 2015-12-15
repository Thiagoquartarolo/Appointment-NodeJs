var Promise = require("q");

var credentials = {
  clientID: "b90e157b-dcfc-46a5-82ba-78d8ad38c4eb",
  clientSecret: "LHsMc3g6wyGOuAp28U5EFvw",
  site: "https://login.microsoftonline.com/common",
  authorizationPath: "/oauth2/v2.0/authorize",
  tokenPath: "/oauth2/v2.0/token"
};
var oauth2 = require("simple-oauth2")(credentials)

var baseUri = 'http://localhost:3000';
var redirectUri = "/api/authorize/o365";
var scopes = [ "openid",
               "https://outlook.office.com/mail.read" ];

function getAuthUrl(request, response) {
  var returnVal = oauth2.authCode.authorizeURL({
    redirect_uri: baseUri + redirectUri,
    scope: scopes.join(" ")
  });

  if(response){
    response.send(returnVal);
  } else{
    return returnVal;
  }
}

function getTokenFromCode(auth_code) {
  var token;
  var deferred = Promise.defer();
  oauth2.authCode.getToken({
    code: auth_code,
    redirect_uri: baseUri + redirectUri,
    scope: scopes.join(" ")
    }, function (error, result) {
      if (error) {
        deferred.reject(error)
      }
      else {
        token = oauth2.accessToken.create(result);
        deferred.resolve(token);
      }
    });
    return deferred.promise;
}

function getUserInformationsFromIdToken(id_token) {
  // JWT is in three parts, separated by a '.'
  var token_parts = id_token.split('.');

  // Token content is in the second part, in urlsafe base64
  var encoded_token = new Buffer(token_parts[1].replace("-", "+").replace("_", "/"), 'base64');

  var decoded_token = encoded_token.toString();

  var jwt = JSON.parse(decoded_token);

  return jwt; //read preferred_username and oid
  //for more information read:
  // https://msdn.microsoft.com/pt-br/library/azure/dn645542.aspx?f=255&MSPPError=-2147217396
}

var outlook = require("node-outlook");
function getAccessToken(token, email) {
  var deferred = new outlook.Microsoft.Utility.Deferred();
  var user_info = { token: token, email: email };
  deferred.resolve(user_info);
  return deferred;
}

module.exports = {
  getAuthUrl: getAuthUrl,
  getUserInformationsFromIdToken: getUserInformationsFromIdToken,
  getTokenFromCode: getTokenFromCode,
  getAccessToken: getAccessToken
}
