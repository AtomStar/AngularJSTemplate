(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataSrv', dataSrv);

    dataSrv.$inject = ['$http', 'notifySrv'];

    function dataSrv($http, notify) {
        var baseUrl = 'api';
      
        var service = {
            get: get,
            getByVal: getByVal,
            post: post
        };

        return service;

        function get(endpoint) {
            return $http.get(baseUrl + '/' + endpoint)
                .error(function (data, status) {
                    notify.error('Error loading data from ' + endpoint + ' (' + status + ')');
                });
        }
        function getByVal(endpoint, val) {
            return $http.get(baseUrl + '/' + endpoint + '/' + val)
                .error(function (data, status) {
                    notify.error('Error loading data from ' + endpoint + ' (' + status + ')');
                });
        }
        function post(endpoint, data) {
            return $http.post(baseUrl + '/' + endpoint, data)
               .error(function (data, status) {
                   notify.error('Error sending data to ' + endpoint + ' (' + status + ')');
               });
        }
    }
})();