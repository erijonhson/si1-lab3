(function () {
  
    'use strict';
 
    angular
        .module('login')
        .factory('TokenInterceptor', TokenInterceptor);
	
    TokenInterceptor.$inject = ['$q', '$location', '$rootScope'];
    function TokenInterceptor($q, $location, $rootScope) {
    	
    	return {
		
    		'request': function(config){
    			
    			if ($rootScope.globals.currentUser && !$rootScope.globals.currentUser.api) {
    				config.headers.Authorization = 'Bearer ' + $rootScope.globals.currentUser.token;
    			}
		
    			return config;
    		},
    		
    		'responseError': function (rejection){
    			if(rejection.status < 200 && rejection.status > 299){
    				$location.path("/login");
    			}
    			return response;
    		}
    		
	    }
	}
	
})();