/**
 * Form add user Controller
 *
 * Injections:
 *
 *  built-in services:
 *    - $scope
 *    - $rootScope
 *    - firebaseDataService
 *
 *
 */
(function () {

  'use strict';

angular
  .module('bookToRead')
  .controller('formAddCntrl', ['$rootScope', '$scope', 'firebaseDataService', function($rootScope, $scope, firebaseDataService) {

  $scope.update = function(currentTodoBook) {
      currentTodoBook.save_library = "save";
      var current = angular.fromJson(angular.toJson(currentTodoBook));
      firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/library/').push(current);
      $.each($scope.toDoLibrary, function(index, value){
        if(value.name === currentTodoBook.name) {
          firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/' + index).update({
            "save_library" : "save"
          });
        }
      });
      $scope.selectTab(false);
  };
  }]);
})();
