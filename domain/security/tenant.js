var security = require('./oauth');

// the middleware function
module.exports = function() {

  //add user to request
  return function(request, response, next) {

    if (request.headers['authorization']) {
      security.getLoggedUser(request.headers['authorization'].substring(7), function(err, token) {
        request.user = token.user;
        next();
      });
    } else {
      next();
    }

  }
};
