(function () {
  
  angular.
    module('serie').
    factory('serieFactory', ['$http', function($http) {
  
      var serieFactory = function (serieOmdbapi) {
        this.Title = serieOmdbapi.Title;
        this.Year = serieOmdbapi.Year;
        this.Rated = serieOmdbapi.Rated;
        this.Released = serieOmdbapi.Released;
        this.Runtime = serieOmdbapi.Runtime;
        this.Genre = serieOmdbapi.Genre;
        this.Director = serieOmdbapi.Director;
        this.Writer = serieOmdbapi.Writer;
        this.Actors = serieOmdbapi.Actors;
        this.Plot = serieOmdbapi.Plot;
        this.Language = serieOmdbapi.Language;
        this.Country = serieOmdbapi.Country;
        this.Awards = serieOmdbapi.Awards;
        this.Poster = serieOmdbapi.Poster != "N/A" ? 
            serieOmdbapi.Poster : "img/no-img.jpg";
        this.Ratings = serieOmdbapi.Ratings;
        this.Metascore = serieOmdbapi.Metascore;
        this.imdbRating = serieOmdbapi.imdbRating;
        this.imdbVotes = serieOmdbapi.imdbVotes;
        this.imdbID = serieOmdbapi.imdbID;
        this.Type = serieOmdbapi.Type;
        this.totalSeasons = serieOmdbapi.totalSeasons;
        // especificação
        this.myRating = serieOmdbapi.myRating || 0.0;
        this.lastWatchedEpisode = serieOmdbapi.lastWatchedEpisode || '';
        this.mySeason = serieOmdbapi.mySeason || 0;
        this.tipoSerie = serieOmdbapi.tipoSerie || '';
        this.usuario = serieOmdbapi.usuario || {};
        this.id = serieOmdbapi.id;
      };
  
      /**
       * https://github.com/ericbreno/lab-03-si1/blob/master/src/main/webapp/js/factory/Series.js
       * Carrega os detalhes do IMDB para a série.
       */
      serieFactory.prototype.carregarDetalhes = function () {
          const getUri = 'http://www.omdbapi.com/?apikey=93330d3c&r=json&i=' + this.imdbID;
          return $http.get(getUri).then(data => {
        	  this.mergeDetails(data.data);
              return this;
          });
      };
      
      /**
       * Faz um merge entre as informações recebidas e o próprio objeto, atualizando-o.
       */
      serieFactory.prototype.mergeDetails = function (serieOmdbapi) {
    	  this.Title = serieOmdbapi.Title;
          this.Year = serieOmdbapi.Year;
          this.Rated = serieOmdbapi.Rated;
          this.Released = serieOmdbapi.Released;
          this.Runtime = serieOmdbapi.Runtime;
          this.Genre = serieOmdbapi.Genre;
          this.Director = serieOmdbapi.Director;
          this.Writer = serieOmdbapi.Writer;
          this.Actors = serieOmdbapi.Actors;
          this.Plot = serieOmdbapi.Plot;
          this.Language = serieOmdbapi.Language;
          this.Country = serieOmdbapi.Country;
          this.Awards = serieOmdbapi.Awards;
          this.Poster = serieOmdbapi.Poster != "N/A" ? 
              serieOmdbapi.Poster : "img/no-img.jpg";
          this.Ratings = serieOmdbapi.Ratings;
          this.Metascore = serieOmdbapi.Metascore;
          this.imdbRating = serieOmdbapi.imdbRating;
          this.imdbVotes = serieOmdbapi.imdbVotes;
          this.imdbID = serieOmdbapi.imdbID;
          this.Type = serieOmdbapi.Type;
          this.totalSeasons = serieOmdbapi.totalSeasons;
      };
      
      serieFactory.prototype.constructor = serieFactory;
      
      return serieFactory;
  
    }])
  
})();