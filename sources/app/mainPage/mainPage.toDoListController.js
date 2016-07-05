/**
 * todo list Controller
 *
 * Injections:
 *
 *  built-in services:
 *    - $scope
 *    - $rootScope
 *    - $timeout
 *    - firebaseDataService
 *
 */
(function () {

  'use strict';

angular
  .module('bookToRead')
  .controller('TodoListController',['$rootScope','$scope', '$timeout','firebaseDataService', function($rootScope, $scope, $timeout, firebaseDataService) {
  var todoList = this;

   $rootScope.$watch('currentUser', function(newVal, oldVal) {
      if(newVal) {
         firebaseDataService.root.ref('users/' + newVal.Id + '/toDoLibrary/').on('value', function(snapshot) {
          $timeout(function() {
            var snapshotVal = snapshot.val();
            var currentArray = [];
            if(snapshotVal) {
              $.each(snapshotVal, function(index, value){
                currentArray.push(value);
              });
              $scope.todos = currentArray;
              $rootScope.toDoLibrary = snapshotVal;
            }
          })
        });
      }
  });


  todoList.read = "all";
  $scope.tab = false;
  todoList.todoItem = null;

  $scope.selectTab = function(setTab) {
    $scope.tab = setTab;
  };

  $scope.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  };

  todoList.selectTodoItem = function(setTab) {
    this.todoItem = setTab;
  };

  todoList.isSelectedTodoItem = function(checkTab) {
    return this.todoItem === checkTab;
  };

  todoList.todoInfo = function(todo) {
    todo.done = false
    $scope.currentTodoBook = todo;
    $scope.selectTab(true);
  };

  todoList.saveBookToLibrary = function() {
    $rootScope.booksLibrary.push($scope.currentTodoBook);
    todoList.selectTab(false);
  }

  todoList.readBookDone = function(todo) {
    var currentIndex;
    $.each($scope.toDoLibrary, function(index, value){
      if(value.name === todo.name) {
        if(value.done === true) {
          firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/' + index).update({
            "done" : false
          });
        } else {
          firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/' + index).update({
            "done" : true
          });
        }
      }
    });
    $.each($rootScope.booksLibrary, function(index, value){
      if(value.name === todo.name) {
        if(value.done === true) {
          firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/library/' + index).update({
            "done" : false
          });
        } else {
          firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/library/' + index).update({
            "done" : true
          });
        }
      }
    });
  }

  todoList.setRead = function(status) {
    todoList.read = status;
  };

  todoList.addTodo = function() {
    var newToDo = {
      name:todoList.todoText,
      done:false,
      viewAll:"all",
      save_library: "no save"
    };
    var currentToDo = angular.fromJson(angular.toJson(newToDo));
    firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/').push(currentToDo);
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.archive = function() {
    var oldTodos = $scope.todos;
    firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/').remove();
    angular.forEach(oldTodos, function(todo) {
      var currentToDo = angular.fromJson(angular.toJson(todo));
      if (!todo.done) firebaseDataService.root.ref('users/' + $rootScope.currentUser.Id + '/toDoLibrary/').push(currentToDo);
    });
  };

}]);
})();
