'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, index: {unique: true}},
  bio: String,
  password: {type: String, required: true, minlength: 6, maxlenght: 32},
  active: {type: Boolean, default: false}
});

UserSchema.pre('save', function(next){
  var user = this;
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

module.exports = mongoose.model('User', UserSchema);
