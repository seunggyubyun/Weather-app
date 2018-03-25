var weatherForecast = angular.module('weatherForecast', ['ngRoute', 'ngResource']);

weatherForecast.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
})

weatherForecast.service('cityService', function() {

    this.city = '';
})

weatherForecast.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

}]);

weatherForecast.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    const API_KEY = 'c79786924cdbc903b723b7444a557007';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=84a29bb569b6dca74aa27273aa6d55ad&q=" + $scope.city + "&cnt=" + $scope.days)

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: API_KEY });

    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    // console.log($scope.weatherResult);

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

}]);

//DIRECTIVE

weatherForecast.directive("weatherReport", function() {
    return {
        restrict: 'E',
        templateUrl: 'directive/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
})
