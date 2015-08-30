'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
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
describe('GET /api/users', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});

describe('GET /api/user/:id', function() {
  beforeEach(function (done) {
    request(app)
      .get('/api/users/')
      .end(function(err, res) {
        if(res.body.length > 0) {
          this._id = res.body[0]._id;
        }else{

          console.log(">>> This test cannot be executed!");
        }
        done();
      });
  });

  it('should respond with JSON object', function(done) {
    if(!this._id) {
      done();
    }

    request(app)
      .get('/api/user/' + this._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

});
