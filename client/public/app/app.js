(function () {
    'use strict'
    var uscensusApp=angular.module('uscensusApp', ['ngRoute', 'ngResource','ui.select', 'ngSanitize']);
        
    uscensusApp.config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'views/templates/main.html',
                        controller: 'UsCensusCtrl'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }]);

})();