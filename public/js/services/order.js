angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Order', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/order');
			}
		}
	}])
	.factory('Pricebook', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/pricebook');
			}
		}
	}]);
