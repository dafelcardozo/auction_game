'use strict';

angular.module('auctionGameApp', ['auctionGameApp.auth', 'auctionGameApp.admin',
    'auctionGameApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
