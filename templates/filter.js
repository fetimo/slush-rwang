(function () {
    'use strict';
    /**
     * An extension of the main module. Extensions cannot define dependencies!
     */
    angular.module('<%= moduleName %>')
    /**
     * Filter broken out into an extension of the main module file.
     */
    .filter('<%= moduleName %>.filters.<%= filterName %>', [ , function () {
        return {

        };
    }]);
})();
