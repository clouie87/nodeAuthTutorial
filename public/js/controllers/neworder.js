angular.module('orderController', [])

	// inject the Todo service factory into our controller
	.controller('neworderController', ['$scope','$http','Pricebook', function($scope, $http, Pricebook) {
		$scope.pricebook = null;
		$scope.pricebooks = [];
		Pricebook.get()
		.success(function(data) {
			$scope.pricebooks = data;
		});
	}]).directive('autoComplete', function() {
		return {
		    restrict: 'A',
		    link: function(scope, elem, attr, ctrl) {
		                // elem is a jquery lite object if jquery is not present,
		                // but with jquery and jquery ui, it will be a full jquery object.
		        debugger;
		        elem.autocomplete({
		            source: scope[attr.uiItems], //from your service
		            minLength: 2
		        }).data("autocomplete")._renderItem = function(ul, item) {
		                return $("<li class='slds-lookup__item'>")
		                    .data( "item.autocomplete", item )
		                    .append('<a href="#" role="option"><svg aria-hidden="true" class="slds-icon slds-icon-standard-account slds-icon--small"><use xlink:href="/icons/standard-sprite/svg/symbols.svg#account"></use></svg>'+item.name+'</a>')
		                    .appendTo('#lookup-menu');
		            };
		    }
		};
	});
