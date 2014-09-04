/* global angular */

angular.module('codeword')
	.controller('puzzleCtrl', ['$scope', '$routeParams', 'puzzle' ,
		function ($scope, $routeParams, puzzle) {

		$scope.map = puzzle.map;
		$scope.state = puzzle.state;
		$scope.initState = puzzle.initState;
		$scope.selected = null;

		$scope.select = function (cell) {
			$scope.selected = cell;
		};

		$scope.deselect = function () {
			$scope.selected = null;
		}

		$scope.setLetter = function (cell, option) {
			$scope.$apply(function () {
				puzzle.setLetter(cell, option);
			});
		};

		$scope.match = function (letter) {
			return puzzle.match(letter);
		};

		$scope.isSolved = function () {
			return puzzle.isSolved();
		};

		$scope.isValid = function () {
			return puzzle.isValid();
		};

		var id = +$routeParams.id;

		$scope.next = id < 148 ? id + 1 : null;

	}]);