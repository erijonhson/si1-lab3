
angular.
  module('serie').
  factory('serieFactory', [ function() {

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
      this.Poster = serieOmdbapi.Poster;
      this.Ratings = serieOmdbapi.Ratings;
      this.Metascore = serieOmdbapi.Metascore;
      this.imdbRating = serieOmdbapi.imdbRating;
      this.imdbVotes = serieOmdbapi.imdbVotes;
      this.imdbID = serieOmdbapi.imdbID;
      this.Type = serieOmdbapi.Type;
      this.totalSeasons = serieOmdbapi.totalSeasons;
      // especificação
      this.myRating = 0.0;
      this.lastWatchedEpisode = '';
      this.mySeason = 0;
    };

    serieFactory.prototype.constructor = serieFactory;

    return serieFactory;

  }])