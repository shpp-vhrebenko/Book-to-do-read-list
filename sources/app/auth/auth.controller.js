/**
 * Auth Controller
 *
 * Injections:
 *
 *  built-in services:
 *    - $scope
 *    - $rootScope
 *    - $location
 *    - $state
 *    - $timeout
 *
 *  custom services:
 *    - authService
 *
 */
(function () {

  'use strict';

angular.module('app.auth')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$state', '$location', '$timeout', function (
    $scope,
    $rootScope,
    $window,
    $state,
    $location,
    $timeout ) {

    var user = {};
    var self = this;

    // Define user's current action - login or register
    $scope.currentAction = $rootScope.currAction;

    /**
       * Signup Function
       *
       * @param {Object} user - new user to sign up
       *
       * @desc if user was created successfully - log user in,
       *       else show error message
       */
      function signup(user) {
        console.log("signup");
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(function () {
            login(user);
          })
          .catch(function (error) {
            $timeout(function() {
              self.error = error.message;
            });
          });
      };

      /**
       * Login Function
       *
       * @param {Object} user - user to login
       *
       * @desc if success - let user in and go to games page,
       *       else show error message
       */
      function login(user) {
        console.log("login");
        if (firebase.auth().currentUser) {
          firebase.auth().signOut();
        }
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(function() {
            $window.location = $window.location.pathname + '#/book-list';
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            $timeout(function() {
              self.error = error.message;
            });
          })
      };

      angular.extend(self, {
        user: user,
        signup: {
          action: signup,
          label : 'Sign Up'
        },
        login: {
          action: login,
          label: 'Log In'
        }
      });

  }]);

})();
