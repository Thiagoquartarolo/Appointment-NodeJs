var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');

module.exports = function(app){

	app.use(morgan('dev'));

	app.use(bodyParser.json());

	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(methodOverride('X-HTTP-Method-Override'));

	app.use(express.static(__dirname + '/view'));

};
