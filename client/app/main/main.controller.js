'use strict';




(function() {



  class MainController {
    constructor($http, $scope, socket, Auth, $mdDialog) {
      this.$http = $http;
      this.socket = socket;
      this.getCurrentUser = Auth.getCurrentUser;
      this.$mdDialog = $mdDialog;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('item');
      });
    }

    $onInit() {
      this.getCurrentUser(u => 
        this.$http.get('/api/users/'+u._id+'/inventory')
          .then(response => this.items = response.data))
      ;
    }

    hello() {
      alert("hello");
    }


  startAuction(ev, item) {
    var useFullScreen = true;

    function DialogController($scope, $mdDialog) {
      $scope.item = item;
      $scope.quantity;
      $scope.minimumBid;

      $scope.hide = function() {
        console.info("Here and there");
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        console.info("Here and there");
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
      $scope.start = function() {
        console.info("Start auction");
      };
    }


    this.$mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
    });
    // // $scope.$watch(function() {
    // //   return $mdMedia('xs') || $mdMedia('sm');
    // // }, function(wantsFullScreen) {
    // //   $scope.customFullscreen = (wantsFullScreen === true);
    // // });
  }
}

  angular.module('auctionGameApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();


