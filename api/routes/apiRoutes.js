var user = require('./userRoutes');
var auth = require('./authRoutes');
var tenant = require('../../domain/security/tenant');


module.exports = function(app){
	//Public routes
	app.use('/api', auth);

	//Restrict routes
	app.use(auth.oauth.authorise());
	app.use(auth.oauth.errorHandler());
	app.use(tenant());
	app.use('/api', user);
};
