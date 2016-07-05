/**
 * FirebaseDataService Factory
 *
 *  @desc Connects to Firebase DB
 *
 *  @return {Object} returns db collections
 */
(function() {

  'use strict';

  angular
    .module('bookToRead')
    .factory('firebaseDataService', function () {
      var root = firebase.database();

      var database = {
        root: root,
        users: root.ref('users')
      };

      return database;
    });

})();
