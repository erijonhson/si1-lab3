(function () {
  
  'use strict';
  
  angular.
    module('serie').
    component('serieListing', {
      templateUrl: 'serie/serie-listing.template.html',
      controller: ['serieService', 'userService', 'modalService',
        function SerieListingController(serieService, userService, modalService) {
          
          var ctrl = this;
  
          ctrl.ehSerieDeUsuario = function(serie) {
            return userService.ehSerieDeUsuario(serie);
          }
  
          ctrl.adicioneSerieDeUsuario = function(serie) {
            if (userService.ehSerieDeUsuario(serie)) {
              modalService.
                mostraAlertaSimples(`A série ` + 
                  serie.Title + ` já está no perfil!`);
            } else {
              serie.tipoSerie = serieService.tipoSerie.perfil;
              userService.adicioneSerieDeUsuario(serie);
              // removeSerie(ctrl.series.list, serie);
            }
          }
  
          ctrl.removeSerieDeUsuario = function(serie) {
            modalService.
              confirmarAcao(`Tem certeza que deseja remover `+ 
                serie.Title +` do perfil?`).then(
                  function(){
                    userService.removeSerieDeUsuario(serie);
                  }
              );
          }
  
          ctrl.ehWatchList = function(serie) {
            return userService.ehWatchList(serie);
          }
  
          ctrl.adicioneWatchList = function(serie) {
            serie.tipoSerie = serieService.tipoSerie.watchlist;
            userService.adicioneWatchList(serie);
          }
  
          ctrl.removeWatchList = function(serie) {
            userService.removeWatchList(serie);
          }
  
          ctrl.ehVisualizacaoDePerfil = function() {
            return 'perfil' === ctrl.visualizacao;
          }
  
          ctrl.ehVisualizacaoDeWatchlist = function() {
            return 'watchlist' === ctrl.visualizacao;
          }
  
          ctrl.ehVisualizacaoDaHome = function() {
            return 'home' === ctrl.visualizacao;
          }
  
          function removeSerie(list, serie){
            for (var i = 0; i < list.length; i++) {
              if (list[i].imdbID === serie.imdbID) {
                list.splice(i,1);
                return true;
              }
            }
            return false;
          }
  
      }],
      bindings: {
        series: '<', // '@?', '&', '=' 
        visualizacao: '@'
      }
    });
  
})();