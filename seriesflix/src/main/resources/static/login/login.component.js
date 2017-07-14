// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {
  
  'use strict';
  
  angular.
    module('login').
    component('login', {
      templateUrl: 'login/login.template.html',
      controller: ('loginController', ['$location', 'AuthenticationService', 'userService', 'modalService', 'endPointsService',
        function serieController($location, AuthenticationService, userService, modalService, endPointsService) {
  
          var ctrl = this;
  
          ctrl.user = {};
          ctrl.dataLoading = false;
          
          (function initController() {
              // reset login status
              AuthenticationService.ClearCredentials();
          })();
   
          ctrl.loginNow = function () {
              ctrl.dataLoading = true;
              AuthenticationService.Login(ctrl.user, function (data) {
                  if (endPointsService.statusOk(data.status)) {
                      AuthenticationService.SetCredentials(data.data);
                      $location.path('/home');
                  } else {
                	  modalService.mostraAlertaSimples('Email ou senha inválidos!');
                      ctrl.dataLoading = false;
                  }
              });
          };
          
      }])
    });
  
})();
