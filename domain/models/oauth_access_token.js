var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthAccessTokenSchema = new Schema({
  access_token: { type: String },
  client_id: { type: String },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  expires: { type: Date }
},
{
  collection: 'oauth_access_tokens'
});

module.exports = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
