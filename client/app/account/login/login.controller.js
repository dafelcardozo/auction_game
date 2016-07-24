'use strict';

class LoginController {
  constructor(Auth, $location, $scope) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$location = $location;
  }

  login(form) {
    this.submitted = true;

    // if (form.$valid) {
    // }
    let name = this.user.name;
     if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name //,
          // email: this.user.email,
          // password: this.user.password
        })
        .then(() => {
          // Account created, redirect to home
          this.$location.path('/');
          // this.Auth.login({
          //     name : this.user.name
          //   })
          //   .then(() => {
          //     // Logged in, redirect to home
          //     this.$location.path('/');
          //   })
          //   .catch(err => {
          //     this.errors.other = err.message;
          //   });
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, field => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}

angular.module('auctionGameApp')
  .controller('LoginController', LoginController)
  .directive('foo', function(Auth){
    return {
        //restrict: 'AE', 
        template:'{{user}} '
        ,
        link: function(scope, elem, attrs){
//            console.info("Linking something to user");
//scope.$watch();
            scope.user ="placeholder"; 
            Auth.getCurrentUser(u => {
              console.info("Inside the directive, u.name "+u.name);
              console.info("Rechecking current user: "+u.currentUser);
              scope.user = u.name;
            }).then();
        }
    };
});
