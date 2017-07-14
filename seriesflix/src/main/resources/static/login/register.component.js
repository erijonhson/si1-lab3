(function () {
  
  'use strict';
  
  angular.
    module('login').
    component('register', {
      templateUrl: 'login/register.template.html',
      controller: ('registerController', ['$location', '$rootScope', 'userService', 'modalService', 'endPointsService',
        function serieController($location, $rootScope, userService, modalService, endPointsService) {
  
          var ctrl = this;
          
          ctrl.user = {};
  
          ctrl.register = function () {
              ctrl.dataLoading = true;
              userService.cadastrar(ctrl.user, function (data) {
                  if (endPointsService.statusOk(data.status)) {
                      modalService.mostraAlertaSimples('Cadastrado com sucesso!');
                      $location.path('/login');
                  } else {
                      modalService.mostraAlertaSimples('Erro no cadastro! Tente novamente mais tarde.');
                      ctrl.dataLoading = false;
                  }
              });
          }
          
      }])
    });
  
})();
