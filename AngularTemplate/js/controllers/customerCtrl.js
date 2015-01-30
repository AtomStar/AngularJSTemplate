(function () {
    'use strict';

    angular
        .module('app')
        .controller('customerCtrl', customerCtrl);

    customerCtrl.$inject = ['$scope', 'customer', 'customerSrv', 'notifySrv'];

    function customerCtrl($scope, customer, customerSrv, notifySrv) {
        /* jshint validthis:true */

        //view model
        var vm = this;
        vm.customer = {};

        //setup grid
        vm.gridOpts = customer.getGridOptions();
        vm.gridOpts.onRegisterApi = function (gridApi) {
            vm.customerGridApi = gridApi;
            vm.customerGridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var customers = vm.customerGridApi.selection.getSelectedRows();
                if (customers) {
                    vm.customer = customers[0];
                    notifySrv.info("You selected " + vm.customer.Description);
                }
            });
        };

        //controller methods on view model
        vm.customerSearch = function () {
            customer.find(vm.LastName, vm.Age).then(function (data) {
                vm.gridOpts.data = data;
            });
        }
        vm.loadCustomers = function () {
            customer.getAll().then(function (data) {
                vm.gridOpts.data = data;
            });
        };
        vm.saveCustomer = function () {
            if (vm.customer.save) {
                vm.customer.save().then(function () {
                    vm.loadCustomers();
                    vm.customer = {};
                    notifySrv.info("Saved successfully");
                });
            }
        };
        vm.addCustomer = function () {
            vm.customer.Id = 0;
            vm.customer.AddressId = 1;
            customerSrv.save(vm.customer).then(function () {
                vm.loadCustomers();
                vm.customer = {};
                notifySrv.info("Added successfully");
            });
        };
        vm.deleteCustomer = function () {
            if (vm.customer.delete) {
                vm.customer.delete().then(function () {
                    vm.loadCustomers();
                    vm.customer = {};
                    notifySrv.info("Deleted successfully");
                });
            }
        };

        //controller initialization method
        activate();
        function activate() {
            vm.loadCustomers();
        }
    }
})();
