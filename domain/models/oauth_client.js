var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthClientSchema = new Schema({
  client_id: { type: String },
  client_secret: { type: String },
  redirect_uri: { type: String }
},
{
  collection: 'oauth_clients'
});

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);
