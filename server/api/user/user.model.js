'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {type: String, required: true, lowercase: true},
  middleName: {type: String, required: false, lowercase: true},
  lastName: {type: String, required: true, lowercase: true},
  email: {type: String, required: true, index: {unique: true}, lowercase: true},
  bio: String,
  password: {type: String, required: false, minlength: 6, maxlenght: 32},
  passphrase:  {type: String, required: false},
  active: {type: Boolean, default: false},
  /**
   * User legend
   * 0 - default registered user
   * 1 - producer
   * 2 - administrator
   * */
  type: {type: Number, default: 0, min: 0, max: 3},
  lastUpdate: {type: Date, default: Date.now()},
  created: {type: Date, default: Date.now()}
});

UserSchema.pre('save', function(next){
  var user = this;
  user.lastUpdate = Date.now();
  delete user.passphrase;
  delete user.type;
  delete user.active;
  delete user.created;

  user.passphrase = user.email + ":" + user.password + ":" + Math.random()*1000+1;
  if(!user.isModified('password')){
    return next();
  }
  /*
  bcrypt encryption goes here
  */
  next();
});

UserSchema.methods.comparePassword = function(password, callback) {
  /* bcrypt check goes here */
  callback(null, true);
};

UserSchema.methods.validateUserByPassphrase = function(passphrase, callback) {
  /* bcrypt check goes here */
  callback(null, true);
};

module.exports = mongoose.model('User', UserSchema);
