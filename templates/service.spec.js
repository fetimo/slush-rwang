describe('<%= serviceName %> service', function () {
    'use strict';

    var <%= serviceName %>Service;

    beforeEach(module('<%= moduleName %>'));

    beforeEach(inject(function (_<%= serviceName %>_) {
        <%= serviceName %>Service = _<%= serviceName %>_;
    }));

    it('should be defined', function () {
        expect(<%= serviceName %>Service).toBeDefined();
    });
});
