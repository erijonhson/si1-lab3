(function () {

  'use strict';
  
  angular.
    module('user').
    service('userService', ['$http', '$rootScope', 'endPointsService', 'serieService', 
    function ($http, $rootScope, endPointsService, serieService) {
  
      var ctrl = this;
  
      ctrl.id;
      ctrl.nome;
      ctrl.apelido;
      ctrl.email;
      ctrl.series;
      
      ctrl.serieList = {
        list: []
      };
  
      ctrl.watchList = {
        list: []
      };
  
      (function init() {
          if ($rootScope.globals.currentUser) {
        	  ctrl.id = $rootScope.globals.currentUser.id;
        	  ctrl.nome = $rootScope.globals.currentUser.nome;
        	  ctrl.apelido = $rootScope.globals.currentUser.apelido;
        	  ctrl.email = $rootScope.globals.currentUser.email;
        	  ctrl.series = $rootScope.globals.currentUser.series;
        	  ctrl.serieList.list = serieService.getSeriesPorTipo(ctrl.series.list, serieService.tipoSerie.perfil);
        	  ctrl.watchList.list = serieService.getSeriesPorTipo(ctrl.series.list, serieService.tipoSerie.watchlist);
          }
      })();
      
      ctrl.cadastrar = function(user, callback) {
          $http.post(endPointsService.postCadastrar, user).then(
              function successCallback (response) {
                  callback(response);
              },
              function errorCallback (response) {
                  callback(response);
              }
          );
      };
      
      ctrl.getSerieList = function() {
        return ctrl.serieList.list;
      }
  
      ctrl.ehSerieDeUsuario = function(serie) {
        return buscaSerie(ctrl.serieList.list, serie);
      }
  
      ctrl.adicioneSerieDeUsuario = function(serie) {
        if (!ctrl.ehSerieDeUsuario(serie))
          ctrl.serieList.list.push(serie);
        if (ctrl.ehWatchList(serie))
          ctrl.removeWatchList(serie);
      }
  
      ctrl.removeSerieDeUsuario = function(serie) {
        return removeSerie(ctrl.serieList.list, serie);
      }
  
      ctrl.ehWatchList = function(serie) {
        return buscaSerie(ctrl.watchList.list, serie);
      }
  
      ctrl.adicioneWatchList = function(serie) {
        if (!ctrl.ehWatchList(serie))
          ctrl.watchList.list.push(serie);
      }
  
      ctrl.removeWatchList = function(serie) {
        return removeSerie(ctrl.watchList.list, serie);
      }
  
      ctrl.getSerie = function(imdbID) {
        var list = ctrl.serieList.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].imdbID === imdbID)
            return list[i];
        }
        list = ctrl.watchList.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].imdbID === imdbID)
            return list[i];
        }
        return null;
      }
  
      ctrl.atualizaSerie = function(serie) {
        if (serie == null || serie == undefined)
          return undefined;
        var list = ctrl.serieList.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].imdbID === serie.imdbID) {
            list[i] = serie;
            return undefined;
          }
        }
        list = ctrl.watchList.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].imdbID === serie.imdbID) {
            list[i] = serie;
            return undefined;
          }
        }
      }
  
      function buscaSerie(list, serie) {
        if (serie == null || serie == undefined)
          return false;
        for (var i = 0; i < list.length; i++) {
          if (list[i].imdbID === serie.imdbID)
            return true;
        }
        return false;
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
  
  }]);
  
})();