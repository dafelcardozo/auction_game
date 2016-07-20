'use strict';

angular.module('auctionGameApp.auth', ['auctionGameApp.constants', 'auctionGameApp.util',
    'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
