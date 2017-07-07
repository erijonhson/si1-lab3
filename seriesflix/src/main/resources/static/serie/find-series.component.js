'use strict';

angular.
  module('serie').
  component('findSeries', {
    templateUrl: 'serie/find-series.template.html',
    controller: ['$http', 'userService', 'serieService',
    function FindSerieListController($http, userService, serieService) {

      var ctrl = this;

      ctrl.tituloDaSerie = '';

      ctrl.series = {
        list: userService.getSerieList()
      };

      ctrl.buscarSeries = function(tituloDaSerie) {
        serieService.buscarSeries(tituloDaSerie)
          .then(function(data) {
            ctrl.series.list = data.data;
          });
      }

    }]
  });
