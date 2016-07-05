/**
 * Main app module Run Function
 *
 * Injections:
 *
 *  built-in services:
 *    - $rootScope
 *    - $location
 *
 *
 * @desc Check if user is authorized on page load
 *
 */
(function () {

  'use strict';

  angular.module('bookToRead')
    .run(function (
      $rootScope,
      $location
    ) {

      $rootScope.currAction = 'login';
      $rootScope.$on('$stateChangeStart', function(event, state) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            $rootScope.currentUser = {
              Id : user.uid,
              Email : user.email,
              status : true
            }
            console.log("Welcome " + $rootScope.currentUser.Email);
          } else {
            $rootScope.currentUser = {};
            console.log("No user is signed in.");
            $location.path('/auth');
          }
        });
      });
    });

})();
