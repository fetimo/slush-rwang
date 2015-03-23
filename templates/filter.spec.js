describe('filter', function() {

    beforeEach(module('<%= moduleName %>'));

    describe('<%= filterName %>', function() {
        it('should be defined',
            inject(function(<%= filterName %>Filter) {
                expect(<%= filterName %>Filter).toBeDefined();
        }));
    });
});
