'use strict';

var Sequelize = require('sequelize');

export default function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    value: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function(models) {
          Bid.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          Bid.belongsTo(models.Auction, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
  });
  return Bid;
}

