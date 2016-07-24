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
      defaultValue:function() {
        var t = new Date();
        t.setSeconds(t.getSeconds() + 90);
        return t;
      }
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

