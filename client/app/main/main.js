'use strict';

angular.module('auctionGameApp')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<main></main>'
    });
  });
