describe('filter', function() {

    beforeEach(module('<%= moduleName %>.filters.<%= filterName %>'));

    describe('<%= filterName %>', function() {
        it('should be defined',
            inject(function(<%= filterName %>Filter) {
                expect(<%= filterName %>Filter).toBeDefined();
        }));
    });
});
