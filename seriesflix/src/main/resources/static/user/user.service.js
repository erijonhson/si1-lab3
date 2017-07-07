'use strict';

angular.
  module('user').
  service('userService', [function () {

    var ctrl = this;

    ctrl.serieList = {
      list: []
    }

    ctrl.watchList = {
      list: []
    }

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
