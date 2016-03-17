angular.module('orderController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Order', function($scope, $http, Order) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Order.get()
			.success(function(data) {
				$scope.orders = {};
				for(var i=;i< data.length;i++){
					var orderItem = [];
					if($scope.orders.hasOwnProperty(data[i].ordernumber)){
						orderItem = $scope.orders[data[i].ordernumber];		
					}
					orderItem.push(data[i]);
					$scope.orders[data[i].ordernumber] = orderItem;
				}
				
				$scope.loading = false;
			});

		/* CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrder = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Order.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.orders = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteOrder = function(id) {
			$scope.loading = true;

			Order.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; // assign our new list of todos
				});
		};*/
	}]);
