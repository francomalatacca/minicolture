'use strict';


var should = require('should');
var app = require('../../app');
var request = require('supertest');
var controller = require('./company.controller');
var userController = require('../user/user.controller');

/*
 {
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
 }
 */

describe('Company Get', function(done) {
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
        legalName: "Morningstar Carciofi",
        id: "112302315432",
        address: {
          addressLine1: "via Pergolesi 25",
          addressLine2: "",
          city: "Milano",
          state: "Mi",
          cap: "20124"
        },
        contact: {
          mobile: "003912412432",
          phone: "00390230301245"
        },
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

describe('Get Company:id', function(done) {
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
        legalName: "Morningstar Carciofi",
        id: "112302315432",
        address: {
          addressLine1: "via Pergolesi 25",
          addressLine2: "",
          city: "Milano",
          state: "Mi",
          cap: "20124"
        },
        contact: {
          mobile: "003912412432",
          phone: "00390230301245"
        },
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

describe('Update Company', function(done) {

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
        legalName: "Morningstar Carciofi",
        id: "112302315432",
        address: {
          addressLine1: "via Pergolesi 25",
          addressLine2: "",
          city: "Milano",
          state: "Mi",
          cap: "20124"
        },
        contact: {
          mobile: "003912412432",
          phone: "00390230301245"
        },
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
