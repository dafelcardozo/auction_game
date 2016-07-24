/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

console.info("Options here: "+JSON.stringify(config.sequelize));

var db = {
  Sequelize,
  sequelize: new Sequelize('auction_game', 'root', null, config.sequelize)
};

// Insert models below
db.User = db.sequelize.import('../api/user/user.model');
db.Item = db.sequelize.import('../api/item/item.model');
db.Auction = db.sequelize.import('../api/auction/auction.model');
db.Bid = db.sequelize.import('../api/bid/bid.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.Inventory = db.sequelize.import('../api/inventory/inventory.model');


Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
