/**
 * Games app Main Controller
 *
 * Injections:
 *
 *  built-in services:
 *    - $scope
 *    - $location
 *
 *  custom services:
 *
 */
(function () {

  'use strict';

  angular
    .module('bookToRead')
    .controller('MainCtrl', ['$scope','$location', function (
      $scope,
      $location
    ) {

      /**
       * LogOut function
       *
       * @desc Resets Firebase connection,
       *       logs user out of the application,
       *       changes location to login page.
       */

      $scope.logOut = function () {
        console.log("logOutUser");
        firebase.auth().signOut();
        $location.path('/auth');
      };

    }]);

})();
