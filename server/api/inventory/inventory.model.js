'use strict';

var Sequelize = require('sequelize');
var User = require('../user/user.model');

export default function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    quantity: {
      type:DataTypes.INTEGER,
      defaultValue:1000
    }
  }, {
    classMethods: {
          associate: function(models) {
            Inventory.belongsTo(models.User, {
              onDelete: "CASCADE",
              foreignKey: {
                allowNull: false
              }
            });
            Inventory.belongsTo(models.Item, {
              onDelete: "CASCADE",
              foreignKey: {
                allowNull: false
              }
            });
          }
        }
    });
  return Inventory;
}
