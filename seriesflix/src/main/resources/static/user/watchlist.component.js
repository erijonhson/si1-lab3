(function () {
  
  'use strict';
  
  angular.module('user').
  component('watchlist', {
    templateUrl: 'user/watchlist.template.html',
    controller: ['userService',
      function userWatchListController(userService) {
        var ctrl = this;
        ctrl.watchList = userService.watchList;
    }]
  });
  
})();