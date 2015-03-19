/* global module, inject, it, expect, describe, beforeEach */

describe('<%= directiveName %> directive', function() {
    var elm,
        scope,
        timeout,
        compile;

    beforeEach(module('<%= moduleName %>'));

    beforeEach(inject(function($rootScope, $compile, $timeout) {
        elm = angular.element(
            '<div>' +
            '</div>');

        scope = $rootScope;
        compile = $compile;
        timeout = $timeout;
    }));

    it('description of test', function() {
        expect(true).toBe(true);
    });
});
