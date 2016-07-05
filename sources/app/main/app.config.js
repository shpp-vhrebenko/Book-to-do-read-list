/**
*
* Main app module Config
*
* Injections:
*
*  built-in services:
*    - $stateProvider
*    - $urlRouterProvider
*
* @desc Defines app routes
*
*/
(function () {

  'use strict';

  angular
    .module('bookToRead')
    .config(function (
      $stateProvider,
      $urlRouterProvider
    ) {
      $urlRouterProvider.otherwise('/auth');

      $stateProvider
        .state('auth', {
          url: '/auth',
          templateUrl: 'sources/app/views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'auth'
        })
        .state('book-list', {
          url: '/book-list',
          templateUrl: 'sources/app/views/book-list.html',
          controller: 'DataController',
          controllerAs: 'data'
        })
    });

})();
