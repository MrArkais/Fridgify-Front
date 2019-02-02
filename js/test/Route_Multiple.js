describe('Test routes', function () {
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', 'pages/multiplesearch.html').respond('/');
        });
    })

    it('Redirection MultiSearch', function () {
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function () {
            $location.path('/');
        });
        expect($location.path()).toBe('/');
        expect($route.current.templateUrl).toBe('pages/multiplesearch.html');
        expect($route.current.controller).toBe('Multiple');
    })

    it('Redirection autres', function () {
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function () {
            $location.path('/other');
        });
        expect($route.current.templateUrl).toBe('pages/multiplesearch.html');
        expect($route.current.controller).toBe('Multiple');
    })
})