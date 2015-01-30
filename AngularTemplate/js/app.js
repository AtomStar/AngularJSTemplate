(function () {
    'use strict';

    angular.module('app', [
        'ngSanitize',
        'ui.grid',
        'ui.grid.selection',
        'ui.bootstrap'
    ])
    //lodash global init
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    });

})();