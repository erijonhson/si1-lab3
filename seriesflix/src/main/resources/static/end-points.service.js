(function () {

  'use strict';
  
  angular.
    module('app').
    service('endPointsService', [function () {
  
      var ctrl = this;
  
      ctrl.basePath = 'http://localhost:8080/seriesflix';
      
      ctrl.postLogin = ctrl.basePath + '/usuario/login';
      ctrl.postCadastrar = ctrl.basePath + '/usuario/cadastrar';
      ctrl.postAdicionaSerie = ctrl.basePath + '/serie/adiciona';
      ctrl.getRemoveSerie = ctrl.basePath + '/serie/buscarSeries/{usuarioId}';
      
      ctrl.statusOk = function (status) {
    	  return (status >= 200 && status <= 299);
      }
      
  }]);
  
})();