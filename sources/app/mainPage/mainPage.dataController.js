/**
 * Data Controller
 *
 * Injections:
 *
 *  built-in services:
 *    - $scope
 *    - $rootScope
 *    - $timeout
 *    - $window
 *    - genreSelect(bookToReadSelectModule)
 *    - sortSelect(bookToReadSelectModule)
 *    - firebaseDataService
 *
 */
(function () {

  'use strict';

angular
  .module('bookToRead')
  .controller('DataController', ['$rootScope','$scope', '$timeout', '$window', 'genreSelect', 'sortSelect', 'firebaseDataService', function($rootScope, $scope, $timeout, $window, genreSelect, sortSelect, firebaseDataService) {
    var bookList = this;
    var currentUserName;
    $scope.genreFilter = genreSelect.genreType;
    $scope.sortFilter = sortSelect.sortType;

    $rootScope.$watch('currentUser', function(newVal, oldVal) {
      if(newVal) {
        firebaseDataService.users.child(newVal.Id + '/library/').on('value', function(snapshot) {
          $timeout(function() {
            var snapshotVal = snapshot.val();
            var currentArray = [];
            if(snapshotVal) {
              $.each(snapshotVal, function(index, value){
                currentArray.push(value);
              });
              $scope.books = currentArray;
              $rootScope.booksLibrary = snapshotVal;
            }
            $scope.userName = newVal.Email;

          })
        });
      }
    });


    bookList.selectTab = function(setTab) {
      this.tab = setTab;
    };

    bookList.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };

    bookList.infoBook = function(book) {
      bookList.currentBook = book;
      bookList.selectTab(true);
    };

    bookList.ifReadBook = function(book) {
      return book.done ? "done" : "schedule";
    }

    bookList.arrayRatingStars = function(book) {
      var resultArray = [];
      for (var i = 0; i < book.rating_stars; i++) {
        resultArray[i] = i;
      }
      return resultArray;
    }

    $scope.orderProp = '-rating_stars';
    $scope.genre = 'all';

  }]);
})();
