angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Order', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/order');
			},
			create : function(todoData) {
				return $http.post('/api/order', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/order/' + id);
			}
		}
	}]);
