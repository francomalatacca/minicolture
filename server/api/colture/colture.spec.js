'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var controller = require('./colture.controller');
var userController = require('../user/user.controller');
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

describe('Colture Get', function(done) {
  var _userId;
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
        _userId = data._id;
        done();
      }
    };
    userController.create(req, res);
  });
  before(function (done) {
    var req = {
      body: {
        name: "Olio d\'Oliva",
        description: "Olio Extravergine d\'Oliva Pugliese di collina",
        coordinates: {
          latitude: 15.89754234,
          longitude: 42.1234567
        },
        type: "Colture type",
        area: 32,
        _user: _userId
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
    controller.create(req, res);
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
    controller.index(mockReq, mockRes);
  });
  after(function (done) {
    var req = {
      params: {id: _id}
    }
    var res = {
      status: function(statusId) { return this; },
      send: function(data) { done(); }
    }
    controller.destroy(req, res);
  });
});

describe('Get Colture:id', function(done) {
  var _id;
  var _userId;
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
        _userId = data._id;
        done();
      }
    };
    userController.create(req, res);
  });
  before(function (done) {
    var req = {
      body: {
        name: "Olio d\'Oliva",
        description: "Olio Extravergine d\'Oliva Pugliese di collina",
        coordinates: {
          latitude: 15.89754234,
          longitude: 42.1234567
        },
        type: "Colture type",
        area: 32,
        _user: _userId
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
    controller.create(req, res);
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
    controller.show(mockReq, mockRes);
  });
  after(function (done) {
    var req = {
      params: {id: _id}
    }
    var res = {
      status: function(statusId) { return this; },
      send: function(data) { done(); }
    }
    controller.destroy(req, res);
  });
});

describe('Update Colture', function(done) {

  var _userId;
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
        _userId = data._id;
        done();
      }
    };
    userController.create(req, res);
  });
  before(function (done) {
    var req = {
      body: {
        name: "Olio d\'Oliva",
        description: "Olio Extravergine d\'Oliva Pugliese di collina",
        coordinates: {
          latitude: 15.89754234,
          longitude: 42.1234567
        },
        type: "Colture type",
        area: 32,
        _user: _userId
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
    controller.create(req, res);
  });
  it('should respond with JSON object', function(done) {
    var req = {
      body: {
        content: 'A random updated test content',
        _user: _userId
      },
      params: { id: _id }
    };
    var res = {
      status: function (statusId) {
        statusId.should.be.equal(200);
        return this;
      },
      json: function(data){
        _id = data._id;
        data.should.have.property("content").equal('A random updated test content');
        done();
      }
    };
    controller.update(req, res);
  });
  after(function (done) {
    var req = {
      params: {id: _id}
    }
    var res = {
      status: function(statusId) { return this; },
      send: function(data) { done(); }
    }
    controller.destroy(req, res);
  });
});
