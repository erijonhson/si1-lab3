// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {
  
    'use strict';
 
    angular
        .module('login')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'endPointsService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, endPointsService) {

    	var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(user, callback) {
            $http.post(endPointsService.postLogin, user).then(
                function successCallback (response) {
                    callback(response);
                },
                function errorCallback (response) {
                	callback(response);
                }
            );
        }
 
        function SetCredentials(login) {
 
            $rootScope.globals = {
                currentUser: {
                	id: login.usuario.id,
                    nome: login.usuario.nome,
                    apelido: login.usuario.apelido,
                    email: login.usuario.email,
                    series: { list: login.usuario.series },
                    token: login.token
                }
            };
 
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
        }
 
    };
 
})();