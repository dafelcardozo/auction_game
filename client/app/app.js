'use strict';

angular.module('auctionGameApp', ['auctionGameApp.auth', 'auctionGameApp.admin',
    'auctionGameApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'ngMaterial', //'ui.bootstrap',
     'validation.match', 
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  })
  .controller('toolbarCtrl', function($scope, Auth){
    $scope.user = 'Felipe';
    $scope.amount = 2450;
    Auth.getCurrentUser(u => {
      console.info("Checking Auth.getCurrentUser: "+JSON.stringify(u));
    });
  });
