var User = require('../domain/models/user');
var oauth = require('../domain/security/oauth');

module.exports = {
  create: create
};

function createUser(username, password, isResponsible) {
  password = oauth.generateHash(password);
  var user = new User({
    username: username,
    password: password,
    isResponsible: !!isResponsible
  });

  user.save(function(err) {
      if(err){
        console.log('Não foi possível gerar o usuário: ' + username);
      } else {
        console.log('Usuário ' + username + ' criado com sucesso.');
      }
  });
}

function create(){
  createUser('thiago.quartarolo@gmail.com', '123', true);
}
