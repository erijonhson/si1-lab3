(function () {
  
  'use strict';
  
  angular.module('app', 
    [
      'ngRoute',
      'ngCookies',
      'login',
      'serie',
      'user',
      'modal'
    ])
    .config(config)
    .run(run);
  
  config.$inject = ['$locationProvider', '$routeProvider'];
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/login', {
        template: '<login></login>'
      }).
      when('/register', {
          template: '<register></register>'
      }).
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
      otherwise('/login');
  }
  
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function run($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
  
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/login');
          }
      });
  }
  
})();