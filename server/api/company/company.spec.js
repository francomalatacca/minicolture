'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

/*
 {
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
 }
 */
/*
describe('GET /api/companies', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/companies')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
*/
