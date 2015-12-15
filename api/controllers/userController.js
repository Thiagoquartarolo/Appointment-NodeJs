var User = require('../../domain/models/user');
var oauth = require('../../domain/security/oauth');

module.exports = {
    getUsers: getUsers,
    saveUsers: saveUsers
};

function getUsers(request, response) {
    try{
        User.find(request.query, function(err, users) {
            if (err)
                response.send(err);

            response.json(users);
        });
    } catch (exception){
        response.sendStatus(404);
    }
}

function saveUsers(request, response) {
    try{
      if(!Array.isArray(request.body)){
        response.status(500).send('Doesn\'t any user to save.');
      }

      var count = request.body.length;
      request.body.forEach(function(item){
        User.findByIdAndUpdate(item._id, item, function(err){
          if(err){
            response.status(500).send(err);
            return;
          }
          count--;
          if(count===0){
            response.send('Users saved.');
          }
        });
      });
    } catch (exception){
        response.sendStatus(404);
    }
}
