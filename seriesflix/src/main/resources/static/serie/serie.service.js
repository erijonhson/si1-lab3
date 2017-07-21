(function () {

  angular.
    module('serie').
    service('serieService', ['$http', 'modalService', 'serieFactory', '$rootScope',
    function($http, modalService, serieFactory, $rootScope) {
      
      var ctrl = this;
   
      var viaImdbID = 'https://omdbapi.com/?i=IMDBID&apikey=93330d3c&type=series';
      var viaTitle = 'https://omdbapi.com/?s=TITLE&apikey=93330d3c&type=series';
   
      ctrl.tipoSerie = {
          perfil: "Perfil", 
          watchlist: "Watchlist"
      };
      
      ctrl.buscarUmaSerie = function(imdbID) {
        return $http.get(viaImdbID.replace('IMDBID', imdbID)).then(
          function (response){
            if (response.data.Error !== undefined) {
              modalService.mostraAlertaSimples('Erro: ' + response.data.Error);
              var result = {data: undefined};
              return result;
            }
            else {
              var result = {};
              result.data = new serieFactory(response.data);
              return result;
            }
          },
          function (response){
            modalService.mostraAlertaSimples(`Erro de busca ao banco de dados. `
              + `Verifique sua conexão com a internet.`);
            var result = {data: undefined};
            return result;
          });
      }
   
      ctrl.buscarSeries = function(tituloDaSerie) {
        var result = {data: undefined};
        return $http.get(viaTitle.replace('TITLE', tituloDaSerie)).then(
          function (response){
            $rootScope.globals.currentUser.app = true;
            if (response.data.Error !== undefined) {
              modalService.mostraAlertaSimples('Erro: ' + response.data.Error);
              return result;
            } else {
              result.data = constroiSeries(response.data.Search);
              return result;
            }
          },
          function (response){
            modalService.mostraAlertaSimples(`Erro de busca ao banco de dados. `
              + `Verifique sua conexão com a internet.`);
            return result;
          });
      }
   
      ctrl.ehSerieValida = function(serie) {
        return serie !== undefined;
      }
      
      ctrl.getSeriesPorTipo = function(lista, tipoSerie) {
        var listaDeSeries = [];
        for (var i = 0; i < lista.length; i++) {
          if (tipoSerie === lista[i].tipoSerie) {
            var imdbID = lista[i].imdbID;
            var serieOMDB = ctrl.buscarUmaSerie(imdbID)
            if (serieOMDB.data !== undefined) {
                var serieOMDB = new serieFactory(response.data);
                serieOMDB.myRating = lista[i].myRating;
                serieOMDB.lastWatchedEpisode = lista[i].lastWatchedEpisode;
                serieOMDB.mySeason = lista[i].mySeason;
                serieOMDB.tipoSerie = lista[i].tipoSerie;
                listaDeSeries.push(serieOMDB);
            }
          }
        }
        return listaDeSeries;
      }
      
      function constroiSeries(seriesOmdbapi) {
        var listaDeSeries = [];
        for (var i = 0; i < seriesOmdbapi.length; i++) {
          listaDeSeries.push(new serieFactory(seriesOmdbapi[i]));
        }
        return listaDeSeries;
      }
  
    }])
  
})();