describe("GetALL", function () {

    beforeEach(module('app'));

    describe("RecipesAll", function () {

        var scope, httpBackend, http, controller;
        beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            http = $http;
            controller = $controller;
            httpBackend.when("GET", "/recipes/recipes").respond([{}, {}, {}]);
        }));

        it('doit retourner GET', function () {
            httpBackend.expectGET('/recipes/recipes');
            controller('RecipesAll', {
                $scope: scope,
                $http: http
            });
            httpBackend.flush();
        });
    });
});