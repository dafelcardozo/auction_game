'use strict';

(function() {
  function MainController($http, $scope, socket, Auth, $mdDialog, $interval) {
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.auctions = [];
      $scope.timer = 0;

      $scope.items = [];
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('auction');
      });    

    $scope.currentAuction = function() {
      //let scope = $scope;
      let timeToExpireFirst = function() {
        if ($scope.auctions.length) {
          var a = moment(new Date());
          var b = moment($scope.auctions[0].expiresAt);
          $scope.timer = b.diff(a, 'seconds');
          if ($scope.timer <= 0)
            $scope.auctions.shift();
          }
      };
      $http.get("/api/auctions/current/current")
      .then(response => {
        $scope.auctions = [response.data];
        timeToExpireFirst(); 
        $interval(timeToExpireFirst, 1000);
        
      });
    };

      socket.syncUpdates('auction', $scope.auctions, function(event, item, object) {
         $scope.currentAuction();
      });

      $scope.getCurrentUser(u => 
        $http.get('/api/users/'+u._id+'/inventory')
        .then(response => $scope.items = response.data));

    $scope.currentAuction();

    $scope.bid;

    $scope.placeBid = function (auction) {
      $scope.getCurrentUser(u => 
        $http.post('/api/bids', {
          AuctionId:auction.id,
          value:$scope.bid, 
          UserId:u._id
      }).then(response => console.info("bid placed")));
      
    }

    $scope.startAuction = function (ev, item) {
      var useFullScreen = true;

      function DialogController($scope, $mdDialog, $http, Auth, socket) {
        $scope.item = item;
        $scope.quantity;
        $scope.minimum_bid;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.io = socket;

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
              ItemId:$scope.item.id,
              UserId:u._id
            }).then(function (response) {              
              $mdDialog.cancel();
              $scope.io.socket.emit('auction', [{"angukar":"puta mierda"}]);
            }, function(error){
              console.info("error:"+error);
            });        
          });
        };
      }

      $mdDialog.show({
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
