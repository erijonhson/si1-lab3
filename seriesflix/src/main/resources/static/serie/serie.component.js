'use strict';

angular.
  module('serie').
  component('serie', {
    templateUrl: 'serie/serie.template.html',
    controller: ('serieController', ['$routeParams', 'modalService', 'serieService', 'userService',
      function serieController($routeParams, modalService, serieService, userService) {

        var ctrl = this;

        ctrl.serieObj;

        var hack = serieService.buscarUmaSerie($routeParams.imdbID)
              .then(function(data) {
                var serieDeUsuario = userService.getSerie($routeParams.imdbID);
                if (serieDeUsuario == null || 
                  serieDeUsuario == undefined || 
                  serieDeUsuario.Plot == null ||
                  serieDeUsuario.Plot == undefined) {
                    ctrl.serieObj = data.data;
                    userService.atualizaSerie(ctrl.serieObj);
                } else {
                  ctrl.serieObj = serieDeUsuario;
                }
              });
    }])
    /* ,
    bindings: {
      serieObj: '<' 
    } */
  });
 