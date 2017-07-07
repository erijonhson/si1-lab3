'use strict';

angular.
  module('app')
  .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<find-series></find-series>'
        }).
        when('/perfil', {
          template: '<user-serie-list></user-serie-list>'
        }).
        when('/watchlist', {
          template: '<watchlist></watchlist>'
        }).
        when('/serie/:imdbID', {
          template: '<serie></serie>',
        }).
        otherwise('/home');
    }
  ]);
