'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  content: {type: String},
  url: {type: String},
  /**
   * Activity legend
   * 0 - created by a producer
   * 1 - created by an agent
   * */
  type: {type: Number, default: 0, min: 0, max: 1},
  lastUpdate: {type: Date, default: Date.now()},
  created: {type: Date, default: Date.now()},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

ActivitySchema.pre('save', function(next) {
  var activity = this;
  activity.lastUpdate = Date.now();
  next();
});

module.exports = mongoose.model('Activity', ActivitySchema);
