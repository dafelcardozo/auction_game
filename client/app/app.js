'use strict';

angular.module('auctionGameApp', ['auctionGameApp.auth', 'auctionGameApp.admin',
    'auctionGameApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'ngMaterial', //'ui.bootstrap',
     'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  })
  .controller('itemsCtrl', function($scope) {
    $scope.images = ['dog.jpg', 'kitty.png', 'laptop.jpeg', 'lincoln_giant.jpg', 'sedan.png', 'smartphone.png'];
  })
  .controller('toolbarCtrl', function($scope){
    $scope.user = 'Felipe';
    $scope.amount = 2450;
  });
