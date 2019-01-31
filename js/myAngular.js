var myAngular = angular.module('plunker', ['selectize']);

myAngular.controller('MainCtrl', function($scope, $http, $sce) {
    $scope.disable = false;
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

    var ing = '';
    $scope.list = [];
    $scope.text = '';

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

    /*Changer de mode de recherche*/
    $scope.searchMode = 0;

    $scope.doListSearch = function()
    {
        $scope.searchMode = 1;
    };

    $scope.doIngSearch = function() {
        $scope.searchMode = 0;
    }

    $scope.submit = function()
    {
        if ($scope.myModel != "" && $scope.myModel != null)
        {
            $scope.ingredient= $scope.myModel.toString();

            console.log($scope.ingredient);

            if($scope.searchMode == 0) {
                var completeURL =  "http://localhost:9090/recipes/find/"+$scope.ingredient;
            }
            else  {
                var completeURL = "http://localhost:9090/recipes/findM/"+$scope.ingredient;
            }

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
                });
        }
        else {
            $scope.data = null;
            $scope.empty = true;
            $scope.length = 0;
        }
    };



    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }
});
