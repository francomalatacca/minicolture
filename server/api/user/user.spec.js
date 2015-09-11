'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var userCtrl = require('./user.controller');
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
describe('User Get', function(done) {
  var _id;
  before(function (done) {
    var req = {
      body: {
        firstName: 'Joe',
        lastName: 'Doe',
        email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
        bio: 'This user is just used for testing purposes and configured into seed file for default config.',
        password: '12345678'
      }
    };
    var res = {
      status: function (statusId) {
        statusId.should.be.equal(201);
        return this;
      },
      json: function(data){
        _id = data._id;
        done();
      }
    };
    userCtrl.create(req, res);
  });
  it('should respond with JSON array', function(done) {
    var mockReq = {};
    var mockRes = {
      status: function(status) {
        return this;
      },
      json: function(data) {
        data.should.be.instanceOf(Array);
        done();
      }
    }
    userCtrl.index(mockReq, mockRes);
  });
});

describe('Get User:id', function(done) {
  var _id;
  before(function (done) {
    var req = {
      body: {
        firstName: 'Joe',
        lastName: 'Doe',
        email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
        bio: 'This user is just used for testing purposes and configured into seed file for default config.',
        password: '12345678'
      }
    };
    var res = {
      status: function (statusId) {
        statusId.should.be.equal(201);
        return this;
      },
      json: function(data){
        _id = data._id;
        done();
      }
    };
    userCtrl.create(req, res);
  });
  it('should respond with JSON object', function(done) {
    if(!_id) {
      throw Error("User's Id can't be null");
    }
    var mockReq = {params: {id: _id}};
    var mockRes = {
      status: function(status) {
        console.log(status);
        return this;
      },
      json: function(data) {
        data.should.be.instanceOf(Object);
        done();
      }
    }
    userCtrl.show(mockReq, mockRes);
  });
});

describe('Create User', function(done) {
  var _id;
  before(function (done) {
   done();
  });
  it('should respond with JSON object', function(done) {
    var req = {
      body: {
        firstName: 'Joe',
        lastName: 'Doe',
        email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
        bio: 'This user is just used for testing purposes and configured into seed file for default config.',
        password: '12345678'
      }
    };
    var res = {
      status: function (statusId) {
        statusId.should.be.equal(201);
        return this;
      },
      json: function(data){
        _id = data._id;
        done();
      }
    };
    userCtrl.create(req, res);
  });
});

/*
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
    var that = this;
    request(app)
      .get('/api/users/')
      .end(function(err, res) {
        if(res.body.length > 0) {
          that._id = res.body[0]._id;
          console.log("\t(info)", this._id);
          done();
        }else {
          console.log("\t(info) This test cannot be executed!");
          done();
        }
      });
  });

  it('should respond with JSON object', function(done) {
    if(!this._id) {
      console.log("\t(info) _id is not defined inside this scope!");
      done();
    }

    request(app)
      .get('/api/users/' + this._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        res.body.should.be.instanceof(Object);
        should.not.exist(res.body.password);
        should.not.exist(res.body.passphrase);
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('bio');
        done();
      });
  });

});

describe('POST /api/user/', function() {

  it('should create an User and respond with JSON object', function(done) {
    var that = this;
    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes and configured into seed file for default config.',
      password: '12345678'
    };

    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        should.not.exist(res.body.password);
        should.not.exist(res.body.passphrase);
        res.body.should.have.property('_id');
        that._id = res.body._id;
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('bio');
        done();
      });
  });

  afterEach(function(done){
    if(!this._id) {
      console.log("\t(info) _id is not defined inside this scope!");
      done();
    }

    request(app)
      .delete('/api/users/' + this._id)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('PUT /api/user/:id', function() {
  beforeEach(function (done) {
    var that = this;
    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes and configured into seed file for default config.',
      password: '12345678'
    };

    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('_id');
        that._id = res.body._id;
        done();
      });
  });

  it('should update an User and respond with JSON object', function(done) {
    var that = this;
    var user = {
      firstName: 'Joe_updated',
      lastName: 'Doe_updated',
      email : 'joe.doe' + Math.random() * 1000 + '_updated@agri.com',
      bio: 'This user is just used for testing purposes and configured into seed file for default config._updated',
      password: '12345678_updated'
    };

    request(app)
      .put('/api/users/' + this._id)
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        should.not.exist(res.body.password);
        should.not.exist(res.body.passphrase);
        res.body.should.have.property('_id');
        that._id = res.body._id;
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('bio');
        done();
      });
  });

  afterEach(function(done){
    if(!this._id) {
      console.log("\t(info) _id is not defined inside this scope!");
      done();
    }

    request(app)
      .delete('/api/users/' + this._id)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('DELETE /api/user/:id', function() {
  beforeEach(function (done) {
    var that = this;
    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes and configured into seed file for default config.',
      password: '12345678'
    };

    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('_id');
        that._id = res.body._id;
        done();
      });
  });

  it('should delete an User and respond with No Content', function(done) {
    if(!this._id) {
      console.log("\t(info) _id is not defined inside this scope!");
      done();
    }

    request(app)
      .delete('/api/users/' + this._id)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
*/
