(function () {
    'use strict';

    angular
        .module('app')
        .factory('customer', customer);

    customer.$inject = ['customerSrv', 'uiGridConstants'];

    function customer(customerSrv, uiGridConstants) {
        var Customer = function (json) {
            angular.extend(this, json);
            this.Description = this.FirstName + " " + this.LastName;
        };

        Customer.prototype.save = function () {
           return customerSrv.save(this);
        }
        Customer.prototype.delete = function () {
            return customerSrv.deleteCustomer(this);
        }
        Customer.getGridOptions = function () {
            return {
                enableSorting: true,
                enableRowSelection: true,
                enableSelectAll: true,
                enableFiltering: true,
                multiSelect: false,
                columnDefs: [
                    {
                        name: 'Name', field: 'FirstName', width: 100, filter: {
                            condition: uiGridConstants.filter.CONTAINS,
                            placeholder: 'contains'
                        }
                    },
                    {
                        name: 'Surname', field: 'LastName', width: 100, filter: {
                            condition: uiGridConstants.filter.CONTAINS,
                            placeholder: 'contains'
                        }
                    }
                    , { name: 'age', field: 'Age', width: 100 }
                ]
            };
        }
        Customer.parseArray = function (jsonArray) {
            var objects = [];
            for (var i = 0; i < jsonArray.length; i++) {
                var o = new Customer(jsonArray[i]);
                objects.push(o);
            }
            return objects;
        };
        Customer.find = function (lastName, age) {
            return customerSrv.getCustomers(lastName, age)
                     .then(function (data) {
                         return Customer.parseArray(data);
                     });
        };
        Customer.get = function (id) {
            return customerSrv.getCustomer(id)
                     .then(function (data) {
                         return new Customer(data);
                     });
        };
        Customer.getAll = function () {
            return customerSrv.getAllCustomers()
                     .then(function (data) {
                         return Customer.parseArray(data);
                     });
        };

        return Customer;
    }
})();