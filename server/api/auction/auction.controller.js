/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/auctions              ->  index
 * POST    /api/auctions              ->  create
 * GET     /api/auctions/:id          ->  show
 * PUT     /api/auctions/:id          ->  update
 * DELETE  /api/auctions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Auction, Item, User} from '../../sqldb';

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


function handleEntityNotFound200(res) {
  return function(entity) {
    if (!entity) {
      res.status(200).end();
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

// Gets a list of Auctions
export function index(req, res) {
  return Auction.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Auction from the DB
export function show(req, res) {
  return Auction.find({
    where: {
      _id: req.params.id
    },
    include:[Item]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Auction in the DB
export function create(req, res) {
  return Auction.create(req.body, {include:[Item]})
    .then(function (a){
      Auction.find({
        where: {
          id:a.id
        },
        include:[Item]
      })
      .then(respondWithResult(res));
    })
    .catch(handleError(res));
}

// Updates an existing Auction in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Auction.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function current(req, res) {
  return Auction.find({
    where: {
      expiresAt: {
         $gt: new Date()
      }
    },
    include:[Item, User]
  })
  .then(handleEntityNotFound200(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Auction from the DB
export function destroy(req, res) {
  return Auction.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
