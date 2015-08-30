/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

/**
 * User Schema
 * email: {type: String, required: true, index: {unique: true}, lowercase: true},
 * bio: String,
 * password: {type: String, required: true, minlength: 6, maxlenght: 32},
 * passphrase:  {type: String, required: true},
 * active: {type: Boolean, default: false},
 * type: {type: Number, default: 0, min: 0, max: 3},
 * lastUpdate: {type: Date, default: Date.now()},
 * created: {type: Date, default: Date.now()}
 */


User.find({}).remove(function() {
  User.create({
    firstName: 'Joe',
    lastName: 'Doe',
    email : 'joe.doe@agri.com',
    bio: 'This user is just used for testing purposes and configured into seed file for default config.',
    password: '12345678'
  });
});
