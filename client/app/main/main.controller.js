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
      this.getCurrentUser(u => this.$http.get('/api/users/'+u._id+'/inventory')
      .then(response => this.items = response.data));
    }


  startAuction(ev, item) {
    var useFullScreen = true;

    function DialogController($scope, $mdDialog, $http, Auth) {
      $scope.item = item;
      $scope.quantity;
      $scope.minimum_bid;
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
      $scope.start = function() {
        $scope.getCurrentUser(u =>{
          $http.post("/api/auctions/", {
            minimum_bid:$scope.minimum_bid,
            quantity:$scope.quantity,
            ItemId:item.id,
            UserId:u._id
          }).then(function () {
            $mdDialog.cancel();
          });        
        });
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


