describe('<%= factoryName %> factory', function () {
    'use strict';

    var <%= factoryName %>Factory;

    beforeEach(module('<%= moduleName %>'));

    beforeEach(inject(function (_<%= factoryName %>_) {
        <%= factoryName %>Factory = _<%= factoryName %>_;
    }));

    it('should be defined', function () {
        expect(<%= factoryName %>Factory).toBeDefined();
    });
});
