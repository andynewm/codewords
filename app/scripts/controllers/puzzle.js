/* global angular */

angular.module('codeword')
	.controller('puzzleCtrl', ['$scope', '$timeout', '$routeParams', 'puzzle',
		function ($scope, $timeout, $routeParams, puzzle) {

		$scope.selected = null;

		$scope.puzzle = puzzle;

		$scope.select = function (cell) {
			$scope.selected = cell;
		};

		$scope.deselect = function () {
			$scope.selected = null;
		};

		$scope.setLetter = function (cell, option) {
			$scope.$apply(function () {
				puzzle.setLetter(cell, option);
			});
		};

		$scope.showCheck = function () {
			$scope.checkVisible = true;
			$timeout(function () { 
				$scope.checkVisible = false;
			}, 1600);
		};

		var id = +$routeParams.id;

		$scope.next = id < 148 ? id + 1 : null;

	}]);