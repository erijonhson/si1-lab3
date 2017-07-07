'use strict';

// Registrar componente `user`
angular.
  module('user').
  component('userSerieList', {
    templateUrl: 'user/user-serie-list.template.html',
    controller: ['userService',
      function userController(userService) {
        var ctrl = this;
        ctrl.serieList = userService.serieList;
    }]
  });
