(function () {
  
    'use strict';
 
    angular
        .module('login')
        .factory('TokenInterceptor', TokenInterceptor);
  
    TokenInterceptor.$inject = ['$q', '$location', '$rootScope'];
    function TokenInterceptor($q, $location, $rootScope) {
      
      return {
    
        'request': function(config){
          
          if ($rootScope.globals.currentUser && config.url.includes("/seriesflix")) {
            config.headers.Authorization = 'Bearer ' + $rootScope.globals.currentUser.token;
          }
    
          return config;
        },
        
        'responseError': function (rejection){
          if(rejection.status === 401){
            $location.path("/login");
          }
          return rejection;
        }
        
      }
  }
  
})();