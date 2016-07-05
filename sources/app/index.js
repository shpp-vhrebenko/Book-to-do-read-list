/**
 * Games app main module initialization
 *
 * Dependencies:
 *
 *  third party modules:
 *    - ui.router
 *    - ui.materialize
 *
 *  custom modules:
 *    - app.auth
 *    - bookToReadSelectModule
 *
 */
(function () {

  'use strict';

  angular
    .module('bookToRead', [
      'app.auth',
      'ui.router',
      'bookToReadSelectModule',
      'ui.materialize'
    ]);


})();
