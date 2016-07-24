'use strict';

export default function(sequelize, DataTypes) {
  var Item =  sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image:DataTypes.TEXT
  },
    {classMethods: {
        associate: function(models) {
          Item.hasMany(models.Inventory);
          Item.hasMany(models.Auction);
        }
      }
    });
  return Item;
}
