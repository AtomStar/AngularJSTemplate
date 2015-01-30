(function () {
    'use strict';

    angular
        .module('app')
        .factory('customerSrv', customerSrv);

    customerSrv.$inject = ['dataSrv'];

    function customerSrv(dataSrv) {
        var service = {
            getCustomer: getCustomer,
            getCustomers: getCustomers,
            getAllCustomers: getAllCustomers,
            save: save,
            deleteCustomer: deleteCustomer
        };
        return service;

        function getCustomer(id) {
            return dataSrv.getByVal('customer', id).then(function (response) {
                return response.data;
            });
        }
        function getAllCustomers() {
            return dataSrv.get('customer').then(function (response) {
                return response.data;
            });
        }
        function getCustomers(lastName, age) {
            var request = { LastName: lastName, Age: age };
            return dataSrv.post('customer/search', request).then(function (response) {
                return response.data;
            });
        }
        function save(customer) {
            return dataSrv.post('customer/save', customer).then(function (response) {
                return response.data;
            });
        }
        function deleteCustomer(customer) {
            return dataSrv.post('customer/delete', customer).then(function (response) {
                return response.data;
            });
        }
    }
})();