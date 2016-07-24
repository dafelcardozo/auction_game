'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import {Inventory, Item} from '../../sqldb';
var router = new Router();

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


router.get('/',  controller.index); // FIXME: auth.hasRole('admin'),
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.get('/:id/inventory', function (req, res) {
  return Inventory.findAll({
    where: {
      userId: req.params.id
    },
    include:[Item]
  })
	.then(respondWithResult(res))
	.catch(handleError(res));
});

router.get('/:id/inventory/gift', function (req, res) {
  return 
  Item.findAll()
  .then(inventories => 
    Inventory
    .bulkCreate(inventories.map(item => ({
        UserId:req.params.id, 
        ItemId:item.id
      })))
    .then(() => 
       res.status(200).end()
    ).catch(handleError(res))
  );
});
module.exports = router;
