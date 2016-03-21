angular.module('orderController', ['ngTagsInput'])

	// inject the Todo service factory into our controller
	.controller('neworderController', ['$scope','$http','Pricebook', function($scope, $http, Pricebook) {
    $scope.pricebooks = [];
		Pricebook.get()
			.success(function(data) {
				$scope.pricebooks = data;
			
			});
	}]);
