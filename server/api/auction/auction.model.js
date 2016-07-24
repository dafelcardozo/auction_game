'use strict';

var Sequelize = require('sequelize');

export default function(sequelize, DataTypes) {
  var Auction = sequelize.define('Auction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    minimum_bid:DataTypes.INTEGER,
    quantity:DataTypes.INTEGER,
    expiresAt:{
      type:DataTypes.DATE,
      defaultValue:new Date(new Date() +  90 * 1000)
    }
  }, {
    classMethods: {
      associate: function(models) {
        Auction.belongsTo(models.User, { 
          onDelete: "CASCADE"
        });
        Auction.belongsTo(models.Item, { 
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Auction.hasMany(models.Bid);
      }
    }
  });
  return Auction;
}

