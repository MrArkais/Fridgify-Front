var app = angular.module('plunker', ['selectize']);

app.controller('MainCtrl', function($scope, $http, $sce) {
    $scope.disable = false;



    //=======================================================
    //Angular Form Bindings
    //=======================================================
    $scope.myModel;

    //$scope.myOptions = [{value: '1', text: 'Tomates'}];

  /*  $scope.changeOptions = function(){
        $scope.myOptions = [{value: '2', text: 'Fromage'}];
    }

    $scope.changeValue = function(){
        $scope.myModel = '2';
    } */

    $scope.myConfig = {
        create: true,
        onChange: function(value){
            console.log('onChange', value)
        },
        // maxItems: 1,
        // required: true,
    }

    //simulate async option loading
 /*   $timeout(function(){
        $scope.myOptions.push({value: '2', text: 'Crusher'})
    }, 2000);*/


    //=======================================================
    //Optgroups
    //=======================================================
    /*$scope.myConfig2 = {
        maxItems: 1,
        optgroupField: 'class',
        labelField: 'name',
        searchField: ['name'],
        render: {
            optgroup_header: function(data, escape) {
                return '<div class="optgroup-header">' + escape(data.label) + ' <span class="scientific">' + escape(data.label_scientific) + '</span></div>';
            }
        },
        optgroups: [
            {value: 'mammal', label: 'Mammal', label_scientific: 'Mammalia'},
            {value: 'bird', label: 'Bird', label_scientific: 'Aves'},
            {value: 'reptile', label: 'Reptile', label_scientific: 'Reptilia'}
        ]
    };*/
/*
    $scope.myOptions2 = [
        {class: 'mammal', value: "dog", name: "Dog" },
        {class: 'mammal', value: "cat", name: "Cat" },
        {class: 'mammal', value: "horse", name: "Horse" },
        {class: 'mammal', value: "kangaroo", name: "Kangaroo" },
        {class: 'bird', value: 'duck', name: 'Duck'},
        {class: 'bird', value: 'chicken', name: 'Chicken'},
        {class: 'bird', value: 'ostrich', name: 'Ostrich'},
        {class: 'bird', value: 'seagull', name: 'Seagull'},
        {class: 'reptile', value: 'snake', name: 'Snake'},
        {class: 'reptile', value: 'lizard', name: 'Lizard'},
        {class: 'reptile', value: 'alligator', name: 'Alligator'},
        {class: 'reptile', value: 'turtle', name: 'Turtle'}
    ];*/

    var ing = '';
    $scope.list = [];
    $scope.text = '';

    $scope.submit = function()
    {

        if ($scope.myModel != "" && $scope.myModel != null)
        {
            /*$scope.ingredient= $scope.myModel.toString();

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

                });*/

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
                    "preparation": "<ul><li>Déroulez, étalez et piquez la pâte dans un moule à tarte. Pelez, videz et coupez en fines tranches les pommes. Posez-les sur la pâte en rosace. </li> <li>Dans un saladier, battez les œufs avec le sucre, puis ajoutez la crème et la cannelle. Versez le mélange sur les pommes. </li><li><b>Pour finir</b> \n Mettez au four à 210°C (thermostat 7) pour 40 minutes environ. Vers la fin de la cuisson, répartissez sur la tarte le sucre vanillé et remettez au four pour caramélisé. </li></ul>",
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

        }
        else {
            $scope.data = null;
            $scope.empty = 'empty';
            $scope.length = 0;
        }


    };

    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }


});
