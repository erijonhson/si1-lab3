(function () {

  'use strict';
  
  angular.
    module('user').
    service('userService', ['$http', '$rootScope', 'endPointsService', 'serieService', 'modalService', 'serieFactory',
    function ($http, $rootScope, endPointsService, serieService, modalService, serieFactory) {
  
      var ctrl = this;
  
      const MENSAGEM_DE_ERRO = 'Servidor temporariamente indisponível! Tente novamente mais tarde.';
      
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
  
      ctrl.inicializar = function init() {
          if ($rootScope.globals.currentUser) {
              ctrl.serieList.list = [];
              ctrl.watchList.list = [];
              ctrl.id = $rootScope.globals.currentUser.id;
              ctrl.nome = $rootScope.globals.currentUser.nome;
              ctrl.apelido = $rootScope.globals.currentUser.apelido;
              ctrl.email = $rootScope.globals.currentUser.email;
              ctrl.series = $rootScope.globals.currentUser.series;
              const todasAsSeries = angular.copy(ctrl.series.list);
              todasAsSeries.forEach(seriesData => {
                  const serie = new serieFactory(seriesData);
                  serie.carregarDetalhes().then(data => {
                      if (serie.tipoSerie === serieService.tipoSerie.perfil) {
                        ctrl.serieList.list.push(serie);
                      } else {
                        ctrl.watchList.list.push(serie);
                      }
                  })
              })
          }
      };
      
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
          serie.usuario = {"id": ctrl.id};
          $http.post(endPointsService.postAdicionaSerie, serie).then(
              function successCallback (response) {
                  if (!ctrl.ehSerieDeUsuario(serie))
                      ctrl.serieList.list.push(serie);
                  if (ctrl.ehWatchList(serie))
                      ctrl.removeWatchList(serie);
              },
              function errorCallback (response) {
                  modalService.mostraAlertaSimples(MENSAGEM_DE_ERRO);
              }
          );
      }
  
      ctrl.removeSerieDeUsuario = function(serie) {
          serie.usuario = {"id": ctrl.id};
          $http.post(endPointsService.postRemoveSerie, serie).then(
              function successCallback (response) {
                  return removeSerie(ctrl.serieList.list, serie);
              },
              function errorCallback (response) {
                  modalService.mostraAlertaSimples(MENSAGEM_DE_ERRO);
              }
          );
      }
  
      ctrl.ehWatchList = function(serie) {
        return buscaSerie(ctrl.watchList.list, serie);
      }
  
      ctrl.adicioneWatchList = function(serie) {
          serie.usuario = {"id": ctrl.id};
          $http.post(endPointsService.postAdicionaSerie, serie).then(
              function successCallback (response) {
            	  if (!ctrl.ehWatchList(serie))
                      ctrl.watchList.list.push(serie);
              },
              function errorCallback (response) {
                  modalService.mostraAlertaSimples(MENSAGEM_DE_ERRO);
              }
          );
      }
  
      ctrl.removeWatchList = function(serie) {
    	  serie.usuario = {"id": ctrl.id};
          $http.post(endPointsService.postRemoveSerie, serie).then(
              function successCallback (response) {
            	  return removeSerie(ctrl.watchList.list, serie);
              },
              function errorCallback (response) {
                  modalService.mostraAlertaSimples(MENSAGEM_DE_ERRO);
              }
          );
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