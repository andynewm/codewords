/* global angular */

angular.module('codeword')
	.controller('selectCtrl', ['$scope', 'storage',
		function ($scope, storage) {

		$scope.states = storage.getGlobalState();

		$scope.range = function (n) {
			var a = [];
			
			for (var i = 0; i < n; i++) {
				a.push(i);
			}

			return a;
		};

	}]);