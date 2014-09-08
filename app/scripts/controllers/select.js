/* global angular */

angular.module('codeword')
	.controller('selectCtrl', ['$scope', 'storage',
		function ($scope, storage) {

		$scope.states = storage.getGlobalState();

	}]);