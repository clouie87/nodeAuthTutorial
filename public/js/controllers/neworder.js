angular.module('orderController', [])

	// inject the Todo service factory into our controller
	.controller('neworderController', ['$scope','$http','Pricebook', function($scope, $http, Pricebook) {
		$scope.pricebook = null;
		$scope.pricebooks = [];
		Pricebook.get()
		.success(function(data) {
			$scope.pricebooks = data;
		});
	}]).directive('autocomplete', function($timeout) {
	        return function(scope, iElement, iAttrs) {
	            iElement.autocomplete({
	                source: scope[iAttrs.uiItems],
	                focus: function(event,ui) {
	                    iElement.val(ui.item.email);
	                    return false;
	                },
	                select: function(event, ui) {
	                        iElement.val(ui.item.email);
	                        return false;
	                      //  iElement.trigger('input');
	                       // iElement.trigger('submit');
	                }
	            }).data("autocomplete")._renderItem = function(ul, item) {
	                return $("<li class='slds-lookup__item'>")
	                    .data( "item.autocomplete", item )
	                    .append('<a href="#" role="option"><svg aria-hidden="true" class="slds-icon slds-icon-standard-account slds-icon--small"><use xlink:href="/icons/standard-sprite/svg/symbols.svg#account"></use></svg>'+item.name+'</a>')
	                    .appendTo('#lookup-menu');
	            };
	        }
    });
