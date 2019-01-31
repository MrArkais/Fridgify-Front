var myAngular = angular.module('app', ['selectize','ngRoute']);
//===================
//Factory
//===================






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
        });
});


//=======================================
//Fin routing
//=======================================

//=======================================
//Controleur Carroussel
//=======================================
myAngular.controller('printall', function ($scope, $http) {

/*    $scope.$on('topic', function (event, arg) {
        $scope.receiver = 'got your ' + arg;
    });

    $scope.$on('length', function (event,arg) {
        $scope.length = arg;

    })*/

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

})

//=======================================
//Controleur Resultat
//=======================================
myAngular.controller('Result', function ($scope) {

    $scope.$on('print', function (event, arg) {
        $scope.data = arg;

    })

    $scope.$on('length', function (event,arg) {
        $scope.length = arg;

    })
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

                    console.log("je suis la");
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
                });


        }
        else {
            $scope.data = null;
            $scope.empty = true;
            $scope.length = 0;
        }


    };



});


