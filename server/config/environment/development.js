'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    dialect:'mysql',
    driver:'mysql',
    user:'root',
    host:'localhost',
    uri: 'auction_game',
    options: {
      logging: false,
      storage: 'dev.mysql',
      define: {
        timestamps: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
   /* define: {
      paranoid: true
    }*/
  },

  // Seed database on startup
  seedDB: true

};
