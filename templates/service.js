(function () {
    'use strict';

    /**
     * An extension of the main module. Extensions cannot define dependencies!
     */
    angular.module('<%= moduleName %>')
    /**
     * Service broken out into an extension of the main module file.
     */
    .service('<%= moduleName %>.services.<%= serviceName %>', [ , function () {
        return {

        };
    }]);
})();
