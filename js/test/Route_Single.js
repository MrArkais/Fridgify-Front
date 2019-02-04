describe('Test routes Single', function () {
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', 'pages/singlesearch.html').respond('/');
        });
    })

    it('Redirection SingleSearch', function () {
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function () {
            $location.path('/simple');
        });
        expect($location.path()).toBe('/simple');
        expect($route.current.templateUrl).toBe('pages/singlesearch.html');
        expect($route.current.controller).toBe('Single');
    })

})