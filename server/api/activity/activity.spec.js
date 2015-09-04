'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/activities', function() {
  beforeEach(function (done) {
    var that = this;

    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes inside activities test set.',
      password: '12345678'
    };

    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .end(function(err, res) {
        var other = that;

        if (err) {
          return done(err);
        }
        res.body.should.have.property('_id');
        that._idUser = res.body._id;
        console.log("User id:", that._idUser);
        var activity = {
          content: 'Just another activity content',
          _user: that._idUser
        };
        request(app)
          .post('/api/activities/')
          .send(activity)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('_id');
            other._idActivity = res.body._id;

            console.log("Activity id:", that._idActivity);
            done();
          });
      });
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/activities')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  afterEach(function(done){
    if(!this._idUser) {
      console.log("\t(info) user's _id is not defined inside this scope!");
      done();
    }
    if(!this._idActivity) {
      console.log("\t(info) activity's _id is not defined inside this scope!");
      done();
    }
    var that = this;

    request(app)
      .delete('/api/users/' + that._idUser)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var other = that;
        request(app)
          .delete('/api/activities/' + other._idActivity)
          .expect(204)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
  });
});

describe('GET /api/activities/:id', function() {
  beforeEach(function (done) {
    var that = this;

    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes inside activities test set.',
      password: '12345678'
    };

    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .end(function(err, res) {
        var other = that;

        if (err) {
          return done(err);
        }
        res.body.should.have.property('_id');
        that._idUser = res.body._id;
        console.log("User id:", that._idUser);
        var activity = {
          content: 'Just another activity content',
          _user: that._idUser
        };
        request(app)
          .post('/api/activities/')
          .send(activity)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('_id');
            other._idActivity = res.body._id;

            console.log("Activity id:", that._idActivity);

            done();
          });
      });
  });

  it('should respond with JSON object', function(done) {
    var that = this;

    request(app)
      .get('/api/activities/' + that._idActivity)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  afterEach(function(done){
    if(!this._idUser) {
      console.log("\t(info) user's _id is not defined inside this scope!");
      done();
    }
    if(!this._idActivity) {
      console.log("\t(info) activity's _id is not defined inside this scope!");
      done();
    }
    var that = this;

    request(app)
      .delete('/api/users/' + that._idUser)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var other = that;
        request(app)
          .delete('/api/activities/' + other._idActivity)
          .expect(204)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
  });
});

describe('POST /api/activities/', function() {

  beforeEach(function (done) {
    var that = this;
    var user = {
      firstName: 'Joe',
      lastName: 'Doe',
      email : 'joe.doe' + Math.random() * 1000 + '@agri.com',
      bio: 'This user is just used for testing purposes inside activities test set.',
      password: '12345678'
    };
    request(app)
      .post('/api/users/')
      .send(user)
      .expect(201)
      .end(function(err, res) {
        var other = that;
        if (err) {
          return done(err);
        }

        res.body.should.have.property('_id');
        that._idUser = res.body._id;
        console.log("User id:", that._idUser);

        done();
      });
  })

  it('should create an Activity and respond with JSON object', function(done) {
    if(!this._idUser) {
      console.log("\t(info) user's _id is not defined inside this scope!");
      done();
    }
    var activity = {
      content: 'Just another activity content',
      _user: this._idUser
    };
    var that = this;
    request(app)
      .post('/api/activities/')
      .send(activity)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('_id');
        that._idActivity = res.body._id;
        console.log("Activity id:", that._idActivity);
        done();
      });
  });

  afterEach(function(done){
    if(!this._idUser) {
      console.log("\t(info) user's _id is not defined inside this scope!");
      done();
    }
    if(!this._idActivity) {
      console.log("\t(info) activity's _id is not defined inside this scope!");
      done();
    }
    var that = this;

    request(app)
      .delete('/api/users/' + that._id)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var other = that;
        request(app)
          .delete('/api/activities/' + other._idActivity)
          .expect(204)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
  });
});

/*
describe('PUT /api/activities/:id', function() {
  beforeEach(function (done) {
    var that = this;
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

describe('DELETE /api/activities/:id', function() {
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
