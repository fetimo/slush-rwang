(function () {
    'use strict';
    /**
     * An extension of the main module. Extensions cannot define dependencies!
     */
    angular.module('<%= moduleName %>')
    /**
     * Factory broken out into an extension of the main module file.
     */
    .factory('<%= moduleName %>.factories.<%= factoryName %>', [ , function () {
        return {

        };
    }]);
})();
