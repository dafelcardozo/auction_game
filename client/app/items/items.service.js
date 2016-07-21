'use strict';
console.info('items provider');

function itemsProvider( ) {

  // Private variables
  var salutation = 'Hello';

  // Private constructor
  function Greeter() {
    this.greet = function () {
      return salutation;
    };
  }

  // Public API for configuration
  this.setSalutation = function (s) {
    salutation = s;
  };

  // Method for instantiating
  this.$get = function (handleSuccess) {
     var request = $http({
       method: "get",
       url: "api/items/",
       params: {
         action: "get"
       }
     });
     return( request.then( handleSuccess, handleError ) );
  };
}

console.info("Registering 'items' service");

angular.module('auctionGameAApp', ['ngRoute'])
  .provider('items', itemsProvider);

