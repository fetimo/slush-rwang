/* global module, inject, it, expect, describe, beforeEach */

describe('<%= controllerName %> controller', function () {

    var createController, scope, $location;

    beforeEach(module('<%= moduleName %>'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();

        createController = function () {
            return $controller('<%= controllerName %>', {
                '$scope': scope
            });
        };
    }));

    it('description of test', function() {
        expect(scope).toBeDefined();
    });
});
