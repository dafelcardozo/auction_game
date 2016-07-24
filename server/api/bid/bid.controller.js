/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bids              ->  index
 * POST    /api/bids              ->  create
 * GET     /api/bids/:id          ->  show
 * PUT     /api/bids/:id          ->  update
 * DELETE  /api/bids/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Bid} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Bids
export function index(req, res) {
  return Bid.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Bid from the DB
export function show(req, res) {
  return Bid.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Bid in the DB
export function create(req, res) {
  return Bid.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Bid in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Bid.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Bid from the DB
export function destroy(req, res) {
  return Bid.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
