'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColtureSchema = new Schema({
  name: {type: String, required: true, lowercase: true},
  description: {type: String, required: true, lowercase: true},
  coordinates: {
    latitude: {type: Schema.Types.Number},
    longitude: {type: Schema.Types.Number}
  },
  type: {type: String, required: true, lowercase: true},
  area: {type: Schema.Types.Number},
  active: {type: Boolean, default: false},
  lastUpdate: {type: Date, default: Date.now()},
  created: {type: Date, default: Date.now()},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Colture', ColtureSchema);
