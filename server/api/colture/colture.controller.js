'use strict';

var _ = require('lodash');
var Colture = require('./colture.model');

// Get list of coltures
exports.index = function(req, res) {
  Colture.find(function (err, coltures) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(coltures);
  });
};

// Get a single colture
exports.show = function(req, res) {
  Colture.findById(req.params.id, function (err, colture) {
    if(err) { return handleError(res, err); }
    if(!colture) { return res.status(404).send('Not Found'); }
    return res.json(colture);
  });
};

// Creates a new colture in the DB.
exports.create = function(req, res) {
  Colture.create(req.body, function(err, colture) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(colture);
  });
};

// Updates an existing colture in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Colture.findById(req.params.id, function (err, colture) {
    if (err) { return handleError(res, err); }
    if(!colture) { return res.status(404).send('Not Found'); }
    var updated = _.merge(colture, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(colture);
    });
  });
};

// Deletes a colture from the DB.
exports.destroy = function(req, res) {
  Colture.findById(req.params.id, function (err, colture) {
    if(err) { return handleError(res, err); }
    if(!colture) { return res.status(404).send('Not Found'); }
    colture.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}