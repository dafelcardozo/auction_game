/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Item = sqldb.Item;

Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

Item.sync()
  .then(() => Item.destroy({ where: {} }))
  .then(() => {
    Item.bulkCreate([{
     // provider: 'local',
      name: 'Carot',
      description: 'A root vegetable usually orange in colour',
      image:'assets/images/carrot.jpg'
    }, {
     // provider: 'local',
      name: 'Bread',
      description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking.\
      Throughout recorded history it has been popular around the world and is one of the oldest artificial foods, having been of importance since the dawn of agriculture.',
      image:'assets/images/bread.png'
    }, {
      name: 'Diamond',
      description:'Diamond is a metastable allotrope of carbon, where the carbon atoms are arranged in a variation\
      of the face-centered cubic crystal structure called a diamond lattice.\
      Diamond is renowned as a material with superlative physical qualities, most of which originate from the strong covalent bonding between its atoms.',
      image:'assets/images/diamond.png'
    }])
    .then(() => {
      console.log('finished populating items');
    });
  });