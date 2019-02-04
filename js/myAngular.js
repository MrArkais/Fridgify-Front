var myAngular = angular.module('app', ['selectize','ngRoute','ngDialog']);

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

        //route pour la recherche avec des ustensiles
        .when('/ustens', {
        templateUrl : 'pages/ustensearch.html',
            controller : 'Ustens'
    })


        .otherwise ({
            templateUrl : 'pages/multiplesearch.html',
            controller : 'Multiple'
        });

});


//=======================================
//Fin routing
//=======================================

//=======================================
//Controlleur pour faire tests (get All)
//=======================================
(function (module) {

    var RecipesAll = function ($scope, $http) {

        $http.get("/recipes/recipes")
            .then(function (result) {
                $scope.recipes = result.data;
            });
    };

    module.controller("RecipesAll",
        ["$scope", "$http", RecipesAll]);

}(angular.module("app")));

//=======================================
//Controleur Resultats
//=======================================
myAngular.controller('printall', function ($scope, $http, ngDialog) {

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
                if (response.data.length === 0)
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


    $scope.clickToOpen = function (row) {
        $scope.recipeClicked = row;
        console.log("Data ",row);

        ngDialog.open({
            template: 'pages/popup.html',
            className:"ngdialog-theme-default custom-width",
            scope: $scope
        });

    };

});

//=======================================
//Controleur Recherche avec Ustensiles
//=======================================
    myAngular.controller('Ustens', function($rootScope,$scope, $http) {
        $scope.disable = false;

        console.log("Ustens");

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

        $scope.allRecipeUstensil = [];
        $scope.allRecipeUstensilString = [];

        var uriAllRecipe = "http://localhost:9090/recipes/ustensil";
        $http.get(uriAllRecipe)
            .then(function(response) {
                console.log(response.data.length);
                if (response.data.length === 0)
                {
                    allRecipeUstensil = null;
                }
                else {
                    $scope.allRecipeUstensil = response.data;
                    console.log("Ustensil 1",$scope.allRecipeUstensil);
                }

                $rootScope.$broadcast('allRecipeUstensil',response.data);
            });


        $scope.submit = function()
        {

            if ($scope.myModel !== "" && $scope.myModel != null)
            {

                $scope.ingredientUstens= $scope.myModel.toString();



                var completeURL = "http://localhost:9090/recipes/find/ustensil/"+$scope.ingredientUstens+"/"+$scope.selectedUstensil;



                $http.get(completeURL)
                    .then(function(response) {

                        console.log(response.data.length);
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

        $scope.reloadPage = function () {
            window.location.reload();
        }



    });






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

        if ($scope.myModel !== "" && $scope.myModel != null)
        {

            $scope.ingredient= $scope.myModel.toString();


            console.log($scope.ingredient);

            var completeURL = "http://localhost:9090/recipes/find/"+$scope.ingredient;


            $http.get(completeURL)
                .then(function(response) {

                    console.log(response.data.length);
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


        $scope.reloadPage = function () {
            window.location.reload();
        }
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

    $scope.reloadPage = function () {
        window.location.reload();
    }


});


function getallRecipe(){

    var uriAllRecipe = "http://localhost:9090/recipes/recipes";
    $http.get(uriAllRecipe)
        .then(function(response) {
            console.log(response.data.length);
            if (response.data.length === 0)
            {
                return null;
            }
            else {
               return data;
            }
        });
}


