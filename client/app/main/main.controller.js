'use strict';


function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}

(function() {

  class MainController {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = []
      this.images =  [];


      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      /*
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
        */


      this.$http.get('/api/items')
        .then(response => {
          this.items = response.data;
          this.items.forEach(item => {
            item.converted =  btoa(String.fromCharCode.apply(null, item.image.data));
          });
        });
    }


    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('auctionGameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();


console.info("Unregistering dependency");

