var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.rootDir = __dirname;

require('./dbStart');
require('./middlewares')(app);
require('./api/routes/apiRoutes')(app);

app.listen(port, function(){
	console.log('Aplicação conectada na porta: ' + port);
});

exports = module.exports = app;
