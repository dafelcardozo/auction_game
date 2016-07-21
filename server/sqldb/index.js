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
  sequelize: new Sequelize(config.sequelize.uri, 'root', null, config.sequelize.options)
};

// Insert models below
db.Item = db.sequelize.import('../api/item/item.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
