'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  legalName: {type: String, required: true, lowercase: true},
  id: {type: String, required: true, lowercase: true},
  address: {
    addressLine1: {type: String, required: true, lowercase: true},
    addressLine2: {type: String, required: true, lowercase: true},
    city: {type: String, required: true, lowercase: true},
    state: {type: String, required: true, lowercase: true},
    cap: {type: String, required: true, lowercase: true}
  },
  contact: {
    mobile: {type: String, required: true, lowercase: true},
    phone: {type: String, required: true, lowercase: true}
  },
  active: {type: Boolean, default: false},
  lastUpdate: {type: Date, default: Date.now()},
  created: {type: Date, default: Date.now()},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Company', CompanySchema);
