var OAuthClient = require('../domain/models/oauth_client');
var oauth = require('../domain/security/oauth');

module.exports = {
  create: create
};

function createAuthClient(id, secret, uri) {

  var client = new OAuthClient({
    client_id: id,
    client_secret: secret,
    redirect_uri: uri
  });

  client.save(function(err) {
      if(err){
        console.log('Não foi possível gerar o client: ' + id);
      } else {
        console.log('Client ' + id + ' criado com sucesso.');
      }
  });
}

function create(){
  createAuthClient('appointment', 'appointment@password', '/');
}
