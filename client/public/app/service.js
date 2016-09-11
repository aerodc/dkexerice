(function(){
    'use strict'

    var uscensusApp= angular.module('uscensusApp');

    function uscensusService ($resource){
        
        var uscensusService={};

        uscensusService.getAllColumns=function(){
           return $resource('/api/columns');
        };

        uscensusService.getValuesByCol=function(col){
           return $resource('/api/'+col);
        };

        uscensusService.getTotalNb=function(col){
           return $resource('/api/totalnb/'+col);
        };

        return uscensusService;
    }
    uscensusService.$inject=['$resource'];
    uscensusApp.factory('uscensusService',uscensusService);
})();