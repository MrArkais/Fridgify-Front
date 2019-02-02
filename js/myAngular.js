var myAngular = angular.module('app', ['selectize','ngRoute'/*,'ngMaterial','ngMessages'*/]);

// configurer les routes
myAngular.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider

    // route pour la page index
        .when('/', {
            templateUrl : 'pages/multiplesearch.html',
            controller  : 'Multiple'
        })

        // route pour la page recherche simple
        .when('/simple', {
            templateUrl : 'pages/singlesearch.html',
            controller  : 'Single'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })

        .otherwise ({
            templateUrl : 'pages/multiplesearch.html',
            controller : 'Multiple'
        });

});


//=======================================
//Fin routing
//=======================================
(function (module) {

    var MoviesController = function ($scope, $http) {

        $http.get("/recipes/recipes")
            .then(function (result) {
                $scope.movies = result.data;
            });
    };

    module.controller("MoviesController",
        ["$scope", "$http", MoviesController]);

}(angular.module("app")));

//=======================================
//Controleur Resultats
//=======================================
myAngular.controller('printall', function ($scope, $http/*, $mdDialog*/) {

    $scope.search = false;

    $scope.$on('print', function (event, arg) {
        $scope.allRecipe = arg;
    });

    $scope.$on('length', function (event,arg) {
        $scope.length = arg;

    })

    $scope.$on('search', function (event, arg) {
        $scope.search = arg;
        $scope.text = "Resultats de la recherche : "
    })

    if ($scope.search === false)
    {
        $scope.text = "Recettes du jour";
        var uriAllRecipe = "http://localhost:9090/recipes/recipes";
        $scope.allRecipe = [];

        $http.get(uriAllRecipe)
            .then(function(response) {
                console.log(response.data.length);
                if (response.data.length == 0)
                {
                    $scope.allRecipe = null;
                }
                else {
                    $scope.allRecipe = response.data;
                    console.log($scope.allRecipe);
                }
                $scope.lengthAllRecipe = response.data.length;
            });
    }

/*
    $scope.showDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };*/

})

//=======================================
//Controleur Recherche Simple
//=======================================
myAngular.controller('Single', function($rootScope,$scope, $http) {
    $scope.disable = false;

    console.log("Single");

    //=======================================================
    //Angular Form Bindings
    //=======================================================
    $scope.myModel;


    $scope.myConfig = {
        create: true,
        onChange: function(value){
            console.log('onChange', value)
        },
        // maxItems: 1,
        // required: true,
    }


    $scope.list = [];
    $scope.text = '';

    $scope.submit = function()
    {

        if ($scope.myModel != "" && $scope.myModel != null)
        {

            $scope.ingredient= $scope.myModel.toString();


            console.log($scope.ingredient);

            var completeURL = "http://localhost:9090/recipes/find/"+$scope.ingredient;


            $http.get(completeURL)
                .then(function(response) {

                    console.log(response.data.length);
                    if (response.data.length == 0)
                    {
                        $scope.data = null;
                    }
                    else {
                        $scope.data = response.data;
                        console.log($scope.data);
                    }

                    $scope.length = response.data.length;

                    $rootScope.$broadcast('length', $scope.length);
                    $rootScope.$broadcast('print', $scope.data);
                    $rootScope.$broadcast('search', true);
                });


        }
        else {
            $scope.data = null;
            $scope.empty = true;
            $scope.length = 0;
        }



    };



});



//=======================================
//Controleur Recherche Multiple
//=======================================
myAngular.controller('Multiple', function($scope, $http, $rootScope) {
    $scope.disable = false;

    console.log("Multiple");



    //=======================================================
    //Angular Form Bindings
    //=======================================================
    $scope.myModel;


    $scope.myConfig = {
        create: true,
        onChange: function(value){
            console.log('onChange', value)
        },
        // maxItems: 1,
        // required: true,
    }


    $scope.list = [];
    $scope.text = '';

    $scope.submit = function()
    {

        if ($scope.myModel !== "" && $scope.myModel != null)
        {

            $scope.ingredient= $scope.myModel.toString();


            console.log($scope.ingredient);

                var completeURL = "http://localhost:9090/recipes/findM/"+$scope.ingredient;


            $http.get(completeURL)
                .then(function(response) {

                    if (response.data.length === 0)
                    {
                        $scope.data = null;
                    }
                    else {
                        $scope.data = response.data;
                        console.log($scope.data);
                    }

                    $scope.length = response.data.length;

                    $rootScope.$broadcast('length', $scope.length);
                    $rootScope.$broadcast('print', $scope.data);
                    $rootScope.$broadcast('search', true);

                });


        }
        else {
            $scope.data = null;
            $scope.empty = true;
            $scope.length = 0;
        }


    };



});


