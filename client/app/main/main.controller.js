'use strict';

(function() {

  class MainController {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
//      this.awesomeThings = [];


      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('item');
      });
    }

    $onInit() {
      this.$http.get('/api/items')
      .then(response => {
        this.items = response.data.map(item => {
          item.converted = item.image ?atob(btoa(String.fromCharCode.apply(null, item.image.data))):null;
          return item;
        });
      });
    }
  }

  angular.module('auctionGameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();



