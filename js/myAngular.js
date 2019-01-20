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

            /* Données en brut pour tests
            $scope.data = [
                {
                    "id": 1,
                    "picture": "https://static.cuisineaz.com/400x320/i93683-tarte-alsacienne-aux-pommes.jpg",
                    "title": "Tarte aux pommes",
                    "listIngredient": [
                        {
                            "title": "pommes"
                        },
                        {
                            "title": "oeufs"
                        }
                    ],
                    "preparation": "Déroulez, étalez et piquez la pâte dans un moule à tarte. Pelez, videz et coupez en fines tranches les pommes. Posez-les sur la pâte en rosace. Dans un saladier, battez les œufs avec le sucre, puis ajoutez la crème et la cannelle. Versez le mélange sur les pommes. Pour finir, Mettez au four à 210°C (thermostat 7) pour 40 minutes environ. Vers la fin de la cuisson, répartissez sur la tarte le sucre vanillé et remettez au four pour caramélisé.",
                    "titleIngredient": [
                        "pommes",
                        "oeufs"
                    ]
                },
                {
                    "id": 2,
                    "picture": "https://static.cuisineaz.com/400x320/i88809-raclette.jpg",
                    "title": "Raclette",
                    "listIngredient": [
                        {
                            "title": "patate"
                        },
                        {
                            "title": "fromage"
                        }
                    ],
                    "preparation": "test",
                    "titleIngredient": [
                        "patate",
                        "fromage"
                    ]
                },
                {
                    "id": 3,
                    "picture": "https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg",
                    "title": "Pizza Pepperoni",
                    "listIngredient": [
                        {
                            "title": "tomates"
                        }
                    ],
                    "preparation": "test",
                    "titleIngredient": [
                        "tomates"
                    ]
                }
            ];
            $scope.length = 3; */
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
